import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { configured, readSession, sessionCookie } from "@/lib/admin-session";
import { getAnalytics } from "@/lib/analytics";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Private dashboard",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: "/admin" },
};
const number = (value: number) => new Intl.NumberFormat("en-US").format(value);
function List({
  title,
  unit,
  rows,
}: {
  title: string;
  unit: string;
  rows: { label: string; value: number }[];
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="text-xs text-slate-500">{unit}</span>
      </div>
      {rows.length ? (
        <ul className="divide-y divide-slate-100">
          {rows.map((row) => (
            <li
              key={row.label}
              className="flex justify-between gap-4 py-3 text-sm"
            >
              <span className="break-all">{row.label}</span>
              <strong className="tabular-nums">{number(row.value)}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">
          No activity recorded in this period.
        </p>
      )}
    </section>
  );
}
export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ days?: string; error?: string }>;
}) {
  const query = await searchParams;
  const days = [7, 30, 90].includes(Number(query.days))
    ? Number(query.days)
    : 30;
  const session = readSession((await cookies()).get(sessionCookie)?.value);
  const ready = configured();
  if (!session)
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#eef1f5] p-6 text-slate-900">
        <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">
            Groovy Builds · Private
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Your website,
            <br />
            by the numbers.
          </h1>
          <p className="mt-4 leading-relaxed text-slate-600">
            See how people find Groovy Builds and what they do next.
          </p>
          {query.error && (
            <p
              role="alert"
              className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900"
            >
              {query.error === "denied"
                ? "This Google account does not have admin access."
                : query.error === "setup"
                  ? "Private sign-in still needs to be connected."
                  : "Sign-in could not be completed. Please try again."}
            </p>
          )}
          {ready ? (
            <a
              className="mt-7 block rounded-xl bg-slate-900 px-5 py-4 text-center font-semibold text-white hover:bg-slate-700"
              href="/api/admin/login"
            >
              Sign in with Google
            </a>
          ) : (
            <div className="mt-7 rounded-xl bg-slate-100 p-4">
              <p className="font-semibold">Connection pending</p>
              <p className="mt-2 text-sm text-slate-600">
                Private sign-in and Google Analytics need to be connected before
                this dashboard can show your numbers.
              </p>
            </div>
          )}
          <p className="mt-4 text-xs text-slate-500">
            Access is restricted to the owner’s approved Google account.
          </p>
          <Link
            href="/"
            className="mt-7 inline-block text-sm underline underline-offset-4"
          >
            Back to the website
          </Link>
        </section>
      </main>
    );
  const result = await getAnalytics(days);
  const data = result.data;
  const max = Math.max(1, ...(data?.daily.map((d) => d.value) || []));
  return (
    <main className="min-h-screen bg-[#eef1f5] text-slate-900">
      <header className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            GROOVY BUILDS{" "}
            <span className="ml-2 text-xs font-normal text-slate-500">
              PRIVATE DASHBOARD
            </span>
          </Link>
          <form action="/api/admin/logout" method="post">
            <button className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100">
              Sign out
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-6 py-9">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Website performance
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              How business finds you.
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Last {days} complete days · Through yesterday · Analytics property
              time zone
            </p>
          </div>
          <nav
            aria-label="Reporting period"
            className="flex rounded-xl border border-slate-200 bg-white p-1"
          >
            {[7, 30, 90].map((n) => (
              <Link
                key={n}
                href={`/admin?days=${n}`}
                aria-current={days === n ? "page" : undefined}
                className={`rounded-lg px-4 py-2 text-sm ${days === n ? "bg-slate-900 text-white" : "hover:bg-slate-100"}`}
              >
                {n} days
              </Link>
            ))}
          </nav>
        </div>
        {result.error ? (
          <section
            role="status"
            className="rounded-2xl border border-amber-200 bg-amber-50 p-6"
          >
            <h2 className="font-semibold">Analytics connection</h2>
            <p className="mt-2 text-sm leading-relaxed">{result.error}</p>
            <p className="mt-3 text-sm">No sample numbers are being shown.</p>
          </section>
        ) : (
          data && (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [
                    "Visitors",
                    number(data.totals[0]),
                    "Active visitors measured by Google",
                  ],
                  [
                    "Visits",
                    number(data.totals[1]),
                    "Sessions, including return visits",
                  ],
                  [
                    "Page views",
                    number(data.totals[2]),
                    "Includes repeat views",
                  ],
                  [
                    "Engaged visits",
                    `${(data.totals[3] * 100).toFixed(1)}%`,
                    "Google Analytics engagement rate",
                  ],
                ].map(([label, value, note]) => (
                  <section
                    key={label}
                    className="rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <h2 className="text-sm text-slate-600">{label}</h2>
                    <p className="my-3 text-4xl font-semibold tabular-nums">
                      {value}
                    </p>
                    <p className="text-xs text-slate-500">{note}</p>
                  </section>
                ))}
              </div>
              <section className="my-6 rounded-2xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold">Visits over time</h2>
                <p className="mt-1 text-sm text-slate-500">Daily sessions</p>
                {data.daily.length ? (
                  <>
                    <div
                      className="mt-6 flex h-40 items-end gap-1"
                      aria-hidden="true"
                    >
                      {data.daily.map((d) => (
                        <div
                          key={d.label}
                          title={`${d.label}: ${d.value} visits`}
                          className="min-w-0 flex-1 rounded-t bg-[#748bb6]"
                          style={{
                            height: `${Math.max(1, (d.value / max) * 100)}%`,
                          }}
                        />
                      ))}
                    </div>
                    <details className="mt-4 text-sm">
                      <summary className="cursor-pointer text-slate-600">
                        View daily numbers
                      </summary>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                        {data.daily.map((d) => (
                          <li key={d.label}>
                            {d.label.slice(4, 6)}/{d.label.slice(6, 8)}/
                            {d.label.slice(0, 4)}: {number(d.value)} visits
                          </li>
                        ))}
                      </ul>
                    </details>
                  </>
                ) : (
                  <p className="mt-6 text-sm text-slate-500">
                    No visits recorded in this period.
                  </p>
                )}
              </section>
              <div className="grid gap-6 lg:grid-cols-2">
                <List
                  title="Where visitors come from"
                  unit="Visits"
                  rows={data.sources}
                />
                <List
                  title="Most viewed pages"
                  unit="Page views"
                  rows={data.pages}
                />
              </div>
              <section className="mt-6 rounded-2xl bg-slate-900 p-6 text-white">
                <h2 className="text-lg font-semibold">Contact activity</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-3">
                  {[
                    ["contact_form_start", "Inquiry forms started"],
                    ["phone_click", "Phone link clicks"],
                    ["email_click", "Email link clicks"],
                  ].map(([event, label]) => (
                    <div key={event}>
                      <p className="text-3xl font-semibold">
                        {number(
                          data.events.find((row) => row.label === event)
                            ?.value || 0,
                        )}
                      </p>
                      <p className="mt-2 text-sm text-slate-300">{label}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-xs leading-relaxed text-slate-300">
                  These are contact actions, not confirmed inquiries or booked
                  jobs. Completed inquiries remain in JobTread. Contact tracking
                  starts when analytics is connected; earlier activity cannot be
                  recovered.
                </p>
              </section>
              {data.limited && (
                <p role="status" className="mt-5 text-sm text-amber-800">
                  Google has applied reporting limits or privacy thresholds to
                  some of these results.
                </p>
              )}
              <p className="mt-6 text-xs leading-relaxed text-slate-500">
                Source: Google Analytics. Data can take time to process and may
                exclude visitors using tracking protection. This dashboard does
                not show advertising spend or booked revenue.
              </p>
            </>
          )
        )}
        <footer className="mt-9 text-xs text-slate-500">
          Signed in as {session.email}
        </footer>
      </div>
    </main>
  );
}
