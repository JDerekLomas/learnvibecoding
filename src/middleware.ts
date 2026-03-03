import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export type Audience = 'corporate' | 'consumer';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const audience: Audience =
    hostname.includes('ai-growth.net') ? 'corporate' : 'consumer';

  const response = NextResponse.next();
  response.headers.set('x-audience', audience);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|textures/).*)'],
};
