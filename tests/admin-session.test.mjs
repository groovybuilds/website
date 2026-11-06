import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import {
  seal,
  unseal,
  readSession,
  equal,
  configured,
} from "../lib/admin-session.ts";
process.env.ADMIN_SESSION_SECRET = randomBytes(32).toString("hex");
process.env.GOOGLE_CLIENT_ID = "test-only";
process.env.GOOGLE_CLIENT_SECRET = "test-only";
process.env.ADMIN_GOOGLE_SUB = "owner-id";
const session = () => ({
  sub: "owner-id",
  email: "owner@example.com",
  accessToken: "secret-token",
  expires: Date.now() + 60000,
});
test("valid session decrypts without exposing token in cookie", () => {
  const value = session(),
    cookie = seal(value);
  assert.deepEqual(readSession(cookie), value);
  assert.ok(
    !Buffer.from(cookie, "base64url").toString().includes(value.accessToken),
  );
});
test("modified and malformed cookies cannot authenticate", () => {
  const bytes = Buffer.from(seal(session()), "base64url");
  bytes[32] ^= 1;
  for (const value of [bytes.toString("base64url"), "junk", "", undefined])
    assert.equal(readSession(value), null);
});
test("expired and unauthorized sessions are rejected", () => {
  assert.equal(
    readSession(seal({ ...session(), expires: Date.now() - 1 })),
    null,
  );
  assert.equal(readSession(seal({ ...session(), sub: "other-id" })), null);
  assert.equal(readSession(seal({ ...session(), accessToken: "" })), null);
});
test("configuration fails closed and rotation invalidates old sessions", () => {
  const cookie = seal(session());
  process.env.ADMIN_SESSION_SECRET = randomBytes(32).toString("hex");
  assert.equal(readSession(cookie), null);
  delete process.env.ADMIN_GOOGLE_SUB;
  assert.equal(configured(), false);
  assert.equal(readSession(seal(session())), null);
  process.env.ADMIN_GOOGLE_SUB = "owner-id";
});
test("state comparisons reject mismatches and unequal lengths", () => {
  assert.equal(equal("abc", "abc"), true);
  assert.equal(equal("abc", "abd"), false);
  assert.equal(equal("abc", ""), false);
  assert.equal(unseal("a".repeat(6001)), null);
});
