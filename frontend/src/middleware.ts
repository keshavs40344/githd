import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ── In-Memory Sliding-Window Rate Limiter ───────────────────────────
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_API_REQUESTS_PER_WINDOW = 60;  // 60 API requests/minute per IP

// ── Malicious User-Agent / Scanner Blacklist ────────────────────────
const BLOCKED_USER_AGENTS = [
  'sqlmap', 'nikto', 'masscan', 'wpscan', 'dirbuster', 'nmap',
  'gobuster', 'acunetix', 'havij', 'pangolin', 'hydra', 'metasploit',
];

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
             request.headers.get('x-real-ip') || 
             '127.0.0.1';
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;

  // 1. Block Malicious Exploit Scanners
  const isBlockedAgent = BLOCKED_USER_AGENTS.some(agent => userAgent.includes(agent));
  if (isBlockedAgent) {
    return new NextResponse('Access Denied: Security Violation', { status: 403 });
  }

  // 2. Block SQLi / XSS / Path Traversal in Query Strings
  const lowerSearch = decodeURIComponent(search).toLowerCase();
  if (
    lowerSearch.includes('<script') ||
    lowerSearch.includes('union select') ||
    lowerSearch.includes('insert into') ||
    lowerSearch.includes('drop table') ||
    lowerSearch.includes('../') ||
    lowerSearch.includes('..\\')
  ) {
    return new NextResponse('Bad Request: Malicious Input Detected', { status: 400 });
  }

  // 3. Sliding-Window Rate Limiting for API Routes
  if (pathname.startsWith('/api/')) {
    const now = Date.now();
    const clientData = rateLimitMap.get(ip) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW_MS };

    if (now > clientData.resetTime) {
      clientData.count = 1;
      clientData.resetTime = now + RATE_LIMIT_WINDOW_MS;
    } else {
      clientData.count++;
    }

    rateLimitMap.set(ip, clientData);

    const limit = pathname.startsWith('/api/v1/mentor') ? 30 : MAX_API_REQUESTS_PER_WINDOW;
    if (clientData.count > limit) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          error: 'Rate limit exceeded. Please wait a minute.' 
        }), 
        { 
          status: 429, 
          headers: { 
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
          } 
        }
      );
    }
  }

  // 4. Create Response with Enterprise Security Headers
  const response = NextResponse.next();

  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Permissions-Policy', 'camera=(), geolocation=(), payment=(), usb=(), display-capture=()');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|sitemap.xml).*)',
  ],
};
