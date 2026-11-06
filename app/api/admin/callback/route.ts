import { NextRequest, NextResponse } from "next/server";
import {
  configured,
  cookieOptions,
  equal,
  flowCookie,
  origin,
  isOwner,
  seal,
  sessionCookie,
  unseal,
} from "@/lib/admin-session";
export const runtime = "nodejs";
export async function GET(request: NextRequest) {
  const finish = (path: string) => {
    const response = NextResponse.redirect(new URL(path, origin()));
    response.cookies.delete(flowCookie);
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  };
  if (!configured()) return finish("/admin?error=setup");
  const flow = unseal(request.cookies.get(flowCookie)?.value) as {
    state?: string;
    verifier?: string;
    expires?: number;
  } | null;
  const state = request.nextUrl.searchParams.get("state");
  const code = request.nextUrl.searchParams.get("code");
  if (
    !flow ||
    typeof flow.state !== "string" ||
    typeof flow.verifier !== "string" ||
    !flow.expires ||
    flow.expires < Date.now() ||
    !state ||
    !equal(state, flow.state) ||
    !code
  )
    return finish("/admin?error=signin");
  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        redirect_uri: `${origin()}/api/admin/callback`,
        grant_type: "authorization_code",
        code_verifier: flow.verifier,
      }),
    });
    if (!tokenResponse.ok) return finish("/admin?error=signin");
    const token = await tokenResponse.json();
    if (
      typeof token.access_token !== "string" ||
      typeof token.expires_in !== "number" ||
      token.expires_in <= 60
    )
      return finish("/admin?error=signin");
    const identityResponse = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        cache: "no-store",
        signal: AbortSignal.timeout(15000),
        headers: { Authorization: `Bearer ${token.access_token}` },
      },
    );
    if (!identityResponse.ok) return finish("/admin?error=signin");
    const identity = await identityResponse.json();
    if (
      !isOwner(identity.sub, identity.email) ||
      identity.email_verified !== true ||
      typeof identity.email !== "string"
    )
      return finish("/admin?error=denied");
    const maxAge = Math.min(token.expires_in - 60, 3600);
    const response = finish("/admin");
    response.cookies.set(
      sessionCookie,
      seal({
        sub: identity.sub,
        email: identity.email,
        accessToken: token.access_token,
        expires: Date.now() + maxAge * 1000,
      }),
      { ...cookieOptions, maxAge },
    );
    return response;
  } catch {
    return finish("/admin?error=signin");
  }
}
