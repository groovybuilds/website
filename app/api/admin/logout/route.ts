import { NextRequest, NextResponse } from "next/server";
import { origin, sessionCookie } from "@/lib/admin-session";
export async function POST(request: NextRequest) {
  if (request.headers.get("origin") !== origin())
    return new NextResponse("Forbidden", { status: 403 });
  const response = NextResponse.redirect(new URL("/admin", origin()), 303);
  response.cookies.delete(sessionCookie);
  response.headers.set("Cache-Control", "no-store");
  return response;
}
