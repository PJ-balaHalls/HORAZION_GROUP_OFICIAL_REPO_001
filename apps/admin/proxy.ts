import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// O Next.js Turbopack exige o export da função como padrão no proxy
export default async function proxy(request: NextRequest) {
  // Acesso seguro aos cookies HTTP-only
  const token = request.cookies.get('horizion_admin_session');
  const { pathname } = request.nextUrl;

  // Libera rotas estáticas, assets, e a própria rota de login
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/images') ||
    pathname === '/login'
  ) {
    return NextResponse.next();
  }

  // Abordagem Zero Trust: sem token, retorna imediatamente para o Login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// O Matcher garante que apenas rotas de negócio passem pela engine do proxy
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};