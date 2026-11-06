import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { seal, sessionCookie } from "../lib/admin-session.ts";
const base = "http://localhost:3017";
process.env.ADMIN_SESSION_SECRET = randomBytes(32).toString("hex");
const env = {
  ...process.env,
  GOOGLE_CLIENT_ID: "test-client",
  GOOGLE_CLIENT_SECRET: "private-test-secret",
  ADMIN_GOOGLE_SUB: "owner",
  ADMIN_APP_ORIGIN: "https://groovybuilds.com",
  GA_PROPERTY_ID: "not-configured",
};
let server;
before(async () => {
  server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", "3017"],
    { env, stdio: "ignore" },
  );
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(base + "/admin")).ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Test server did not start");
});
after(() => server?.kill());
test("anonymous and forged sessions cannot see dashboard data", async () => {
  for (const cookie of ["", `${sessionCookie}=forged`]) {
    const response = await fetch(base + "/admin", { headers: { cookie } });
    const html = await response.text();
    assert.match(html, /Sign in with Google/);
    assert.doesNotMatch(html, /Signed in as/);
    assert.match(html, /noindex/);
    assert.match(response.headers.get("cache-control"), /no-store|private/);
    assert.doesNotMatch(html, /private-test-secret/);
  }
});
test("owner session sees honest disconnected state and no token disclosure", async () => {
  const cookie = seal({
    sub: "owner",
    email: "owner@example.com",
    accessToken: "hidden-access-token",
    expires: Date.now() + 60000,
  });
  const html = await (
    await fetch(base + "/admin", {
      headers: { cookie: `${sessionCookie}=${cookie}` },
    })
  ).text();
  assert.match(html, /Signed in as/);
  assert.match(html, /No sample numbers/);
  assert.doesNotMatch(html, /hidden-access-token/);
});
test("OAuth starts with state, PKCE and secure cookie", async () => {
  const response = await fetch(base + "/api/admin/login", {
    redirect: "manual",
  });
  const url = new URL(response.headers.get("location"));
  assert.equal(url.origin, "https://accounts.google.com");
  assert.equal(url.searchParams.get("code_challenge_method"), "S256");
  assert.ok(url.searchParams.get("state").length >= 32);
  assert.equal(
    url.searchParams.get("redirect_uri"),
    "https://groovybuilds.com/api/admin/callback",
  );
  const cookie = response.headers.get("set-cookie");
  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /Secure/i);
  assert.match(cookie, /SameSite=lax/i);
});
test("callback without matching state cannot establish a session", async () => {
  const response = await fetch(
    base + "/api/admin/callback?code=bad&state=bad",
    { redirect: "manual" },
  );
  assert.equal(
    response.headers.get("location"),
    "https://groovybuilds.com/admin?error=signin",
  );
  assert.doesNotMatch(
    response.headers.get("set-cookie") || "",
    /gb_admin_session=/,
  );
});
test("logout rejects cross-origin posts", async () => {
  const bad = await fetch(base + "/api/admin/logout", {
    method: "POST",
    headers: { origin: "https://attacker.example" },
    redirect: "manual",
  });
  assert.equal(bad.status, 403);
  const good = await fetch(base + "/api/admin/logout", {
    method: "POST",
    headers: { origin: "https://groovybuilds.com" },
    redirect: "manual",
  });
  assert.equal(good.status, 303);
  assert.match(good.headers.get("set-cookie"), /gb_admin_session=;/);
});
