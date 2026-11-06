import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

export type AdminSession = {
  sub: string;
  email: string;
  accessToken: string;
  expires: number;
};
export const sessionCookie = "gb_admin_session";
export const flowCookie = "gb_admin_flow";
export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

function key() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !/^[a-f0-9]{64}$/i.test(secret))
    throw new Error("Admin session key missing");
  return Buffer.from(secret, "hex");
}
export function configured() {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.ADMIN_GOOGLE_SUB &&
    /^[a-f0-9]{64}$/i.test(process.env.ADMIN_SESSION_SECRET || ""),
  );
}
export function origin() {
  const value = process.env.ADMIN_APP_ORIGIN || "https://groovybuilds.com";
  const url = new URL(value);
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:")
    throw new Error("HTTPS required");
  return url.origin;
}
export function seal(value: unknown) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  return Buffer.concat([iv, cipher.getAuthTag(), data]).toString("base64url");
}
export function unseal(value?: string): unknown {
  try {
    if (!value || value.length > 6000) return null;
    const data = Buffer.from(value, "base64url");
    const decipher = createDecipheriv(
      "aes-256-gcm",
      key(),
      data.subarray(0, 12),
    );
    decipher.setAuthTag(data.subarray(12, 28));
    return JSON.parse(
      Buffer.concat([
        decipher.update(data.subarray(28)),
        decipher.final(),
      ]).toString("utf8"),
    );
  } catch {
    return null;
  }
}
export function equal(a: string, b: string) {
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export function readSession(value?: string): AdminSession | null {
  if (!configured()) return null;
  const s = unseal(value) as Partial<AdminSession> | null;
  if (
    !s ||
    s.sub !== process.env.ADMIN_GOOGLE_SUB ||
    typeof s.email !== "string" ||
    typeof s.accessToken !== "string" ||
    !s.accessToken ||
    typeof s.expires !== "number" ||
    s.expires <= Date.now()
  )
    return null;
  return s as AdminSession;
}
