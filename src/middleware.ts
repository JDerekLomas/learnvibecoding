import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export type Audience = 'corporate' | 'consumer' | 'community';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const forwardedHost = request.headers.get('x-forwarded-host') || '';

  let audience: Audience;
  if (hostname.includes('ai-growth.net')) {
    audience = 'corporate';
  } else if (forwardedHost.includes('codevibing.com')) {
    audience = 'community';
  } else {
    audience = 'consumer';
  }

  const response = NextResponse.next();
  response.headers.set('x-audience', audience);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|textures/).*)'],
};
