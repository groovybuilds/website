import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";
import {
  configured,
  cookieOptions,
  flowCookie,
  origin,
  seal,
} from "@/lib/admin-session";
export const runtime = "nodejs";
export async function GET() {
  if (!configured())
    return NextResponse.redirect(new URL("/admin?error=setup", origin()));
  const state = randomBytes(32).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${origin()}/api/admin/callback`,
    response_type: "code",
    scope: "openid email https://www.googleapis.com/auth/analytics.readonly",
    state,
    code_challenge: createHash("sha256").update(verifier).digest("base64url"),
    code_challenge_method: "S256",
    prompt: "select_account",
    access_type: "online",
  }).toString();
  const response = NextResponse.redirect(url);
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(
    flowCookie,
    seal({ state, verifier, expires: Date.now() + 600000 }),
    { ...cookieOptions, maxAge: 600 },
  );
  return response;
}
