import { cookies } from "next/headers";
import { readSession, sessionCookie } from "./admin-session";

type Row = {
  dimensionValues?: { value: string }[];
  metricValues?: { value: string }[];
};
type Report = {
  rows?: Row[];
  metadata?: {
    timeZone?: string;
    subjectToThresholding?: boolean;
    dataLossFromOtherRow?: boolean;
    samplingMetadatas?: unknown[];
  };
};
export type Analytics = {
  totals: number[];
  daily: { label: string; value: number }[];
  sources: { label: string; value: number }[];
  pages: { label: string; value: number }[];
  events: { label: string; value: number }[];
  limited: boolean;
};
export async function getAnalytics(
  days: number,
): Promise<{ data?: Analytics; error?: string }> {
  const session = readSession((await cookies()).get(sessionCookie)?.value);
  if (!session) return { error: "Sign in to view analytics." };
  const property = process.env.GA_PROPERTY_ID || "562290827";
  if (!property || !/^\d+$/.test(property))
    return {
      error:
        "Google Analytics is not connected yet. Your dashboard is ready, but the Analytics property still needs to be linked.",
    };
  const report = async (
    metrics: string[],
    dimensions: string[] = [],
    extra: object = {},
  ): Promise<Report> => {
    const response = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${property}:runReport`,
      {
        method: "POST",
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: `${days}daysAgo`, endDate: "yesterday" }],
          dimensions: dimensions.map((name) => ({ name })),
          metrics: metrics.map((name) => ({ name })),
          dimensionFilter: {
            notExpression: {
              filter: {
                fieldName: "pagePath",
                stringFilter: { matchType: "BEGINS_WITH", value: "/admin" },
              },
            },
          },
          ...extra,
        }),
      },
    );
    if (!response.ok)
      throw new Error(
        response.status === 401
          ? "Your Google session expired. Sign out and sign in again."
          : response.status === 403
            ? "Google Analytics access is not ready. Check that this Google account can view the property and that the Analytics Data API is enabled."
            : "Google Analytics is temporarily unavailable. Try again shortly.",
      );
    return response.json();
  };
  const rows = (r: Report) =>
    (r.rows || []).map((row) => ({
      label: row.dimensionValues?.[0]?.value || "Unknown",
      value: Number(row.metricValues?.[0]?.value || 0),
    }));
  try {
    const [totals, daily, sources, pages, events] = await Promise.all([
      report(["activeUsers", "sessions", "screenPageViews", "engagementRate"]),
      report(["sessions"], ["date"], {
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      report(["sessions"], ["sessionSourceMedium"], {
        limit: 10,
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      }),
      report(["screenPageViews"], ["pagePath"], {
        limit: 10,
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      }),
      report(["eventCount"], ["eventName"], {
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            inListFilter: {
              values: ["contact_form_start", "phone_click", "email_click"],
            },
          },
        },
      }),
    ]);
    // Keep zero-traffic days visible so gaps do not compress the timeline.
    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: totals.metadata?.timeZone || "America/Chicago",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
    const end = new Date(`${today}T12:00:00Z`);
    const dailyMap = new Map(rows(daily).map((row) => [row.label, row.value]));
    const completeDaily = Array.from({ length: days }, (_, index) => {
      const date = new Date(end);
      date.setUTCDate(date.getUTCDate() - days + index);
      const label = date.toISOString().slice(0, 10).replaceAll("-", "");
      return { label, value: dailyMap.get(label) || 0 };
    });
    return {
      data: {
        totals: totals.rows?.[0]?.metricValues?.map((v) => Number(v.value)) || [
          0, 0, 0, 0,
        ],
        daily: completeDaily,
        sources: rows(sources),
        pages: rows(pages),
        events: rows(events),
        limited: [totals, daily, sources, pages, events].some(
          (r) =>
            r.metadata?.subjectToThresholding ||
            r.metadata?.dataLossFromOtherRow ||
            r.metadata?.samplingMetadatas?.length,
        ),
      },
    };
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Analytics could not be loaded.",
    };
  }
}
