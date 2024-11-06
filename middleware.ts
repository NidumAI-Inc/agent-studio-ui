import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const pubicURLs = (
    request.nextUrl.pathname.startsWith('/api/auth/') ||
    request.nextUrl.pathname.startsWith('/api/third-party/chat') ||
    (request.nextUrl.pathname.startsWith('/api/images/') && request.method === 'GET')
  )

  if (pubicURLs) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const authHeader = request.headers.get('Bot-Auth')

  if (authHeader) {
    const allowedOrigins = JSON.parse(process.env.ALLOWED_BOT_ORIGINS || "[]")
    const requestOriginHeader = request.headers.get('Origin') || request.headers.get('Referer') || request.headers.get('X-Custom-Origin') || '';

    let requestOrigin = '';

    try {
      const parsedURL = new URL(requestOriginHeader);
      requestOrigin = parsedURL.origin;
    } catch (error) {
      requestOrigin = '';
    }

    if (!allowedOrigins.includes(requestOrigin)) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Unauthorized origin' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

  } else if (!token) {
    return new NextResponse(
      JSON.stringify({ success: false, message: "Authentication failed" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*'],
}