import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from './stack';

export async function middleware(request: NextRequest) {
  // Rotas que requerem autenticação
  const protectedPaths = ['/dashboard', '/statistics', '/timeline', '/account'];

  // Redirecionar /handler/account-settings para nossa página personalizada
  if (request.nextUrl.pathname === '/handler/account-settings') {
    return NextResponse.redirect(new URL('/account', request.url));
  }

  // Verificar se o usuário está tentando acessar a página inicial após autenticar
  if (request.nextUrl.pathname === '/') {
    try {
      const user = await stackServerApp.getUser();
      if (user) {
        // Se o usuário estiver autenticado e tentar acessar a página inicial, redirecionar para o dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação na página inicial:', error);
    }
  }

  // Verificar se a rota atual está na lista de rotas protegidas
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname === path ||
    request.nextUrl.pathname.startsWith(`${path}/`)
  );

  if (isProtectedPath) {
    try {
      // Verificar se o usuário está autenticado
      const user = await stackServerApp.getUser();

      // Se o usuário não estiver autenticado, redirecionar para a página de login
      if (!user) {
        // Redirecionar para a página de login personalizada
        return NextResponse.redirect(new URL('/sign-in', request.url));
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      // Em caso de erro, redirecionar para a página de login personalizada
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  return NextResponse.next();
}

// Configurar o matcher para que o middleware seja executado apenas nas rotas especificadas
export const config = {
  matcher: [
    '/',
    '/dashboard',
    '/dashboard/:path*',
    '/statistics',
    '/statistics/:path*',
    '/timeline',
    '/timeline/:path*',
    '/account',
    '/account/:path*',
    '/handler/account-settings',
  ],
};
