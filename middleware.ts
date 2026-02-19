import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 公开路由，不需要认证
const publicRoutes = [
  '/auth/login',
  '/auth/register',
  '/api/v1/auth/login',
  '/api/v1/auth/refresh',
  '/api/v1/auth/register',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 检查是否为公开路由
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // 获取token
  const token = request.cookies.get('token')?.value;

  // 如果没有token且不是公开路由，重定向到登录页
  if (!token && !pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // 如果有token且在登录页，重定向到仪表板
  if (token && pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};