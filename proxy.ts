import { NextRequest, NextResponse } from "next/server";

const canonicalHostname = "eternityhvacr.com";
const hstsValue = "max-age=31536000";

export function proxy(request: NextRequest) {
  const hostname =
    request.headers.get("host")?.split(":")[0].toLowerCase() ??
    request.nextUrl.hostname.toLowerCase();
  const isPublicHostname = hostname === canonicalHostname || hostname === `www.${canonicalHostname}`;

  if (isPublicHostname && (hostname !== canonicalHostname || request.nextUrl.protocol !== "https:")) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.hostname = canonicalHostname;
    destination.port = "";
    const response = NextResponse.redirect(destination, 308);
    response.headers.set("Strict-Transport-Security", hstsValue);
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Strict-Transport-Security", hstsValue);
  return response;
}

export const config = { matcher: "/:path*" };
