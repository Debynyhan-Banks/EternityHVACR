import { NextRequest, NextResponse } from "next/server";

const canonicalHostname = "eternityhvacr.com";

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
    return NextResponse.redirect(destination, 308);
  }

  return NextResponse.next();
}

export const config = { matcher: "/:path*" };
