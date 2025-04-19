'use client';

import { useUser, useStackApp } from '@stackframe/stack';
import { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Componente interno que usa useUser de forma segura
function ExploreButtonContent() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Usar try/catch para evitar erros durante o build
  let user = null;
  let app = null;

  try {
    // Tentar obter o usuário e o app apenas no cliente
    if (typeof window !== 'undefined') {
      user = useUser({ or: 'return' });
      app = useStackApp();
    }
  } catch (error) {
    // Silenciar o erro durante o build
  }

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleClick = () => {
    if (isClient) {
      if (user) {
        // Se o usuário estiver autenticado, redirecionar para o dashboard
        router.push('/dashboard');
      } else {
        // Se o usuário não estiver autenticado, redirecionar para a página de login
        if (app) {
          try {
            app.redirectToSignIn();
          } catch (error) {
            // Fallback se o redirecionamento falhar
            router.push('/sign-in');
          }
        } else {
          // Fallback se o app não estiver disponível
          router.push('/sign-in');
        }
      }
    } else {
      // Fallback para o build estático
      router.push('/sign-in');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#F5F5F7] px-10 py-3 rounded-full text-lg font-medium tracking-wider inline-flex items-center gap-3 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tilt-card relative overflow-hidden group cursor-pointer"
    >
      {/* Efeito metálico sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-black/5"></div>

      {/* Borda sutil */}
      <div className="absolute inset-0 rounded-full border border-white/40"></div>

      {/* Sombra interna */}
      <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]"></div>

      <span className="relative z-10 text-[#000000] font-medium tracking-widest">EXPLORE</span>

      {/* Seta minimalista estilo Apple */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 ml-1 transform group-hover:translate-x-1 transition-transform duration-300">
        <path d="M5 12H19" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
        <path d="M13 6L19 12L13 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

// Componente principal com Suspense boundary
export function ExploreButton() {
  return (
    <Suspense fallback={
      <button className="bg-[#F5F5F7] px-10 py-3 rounded-full text-lg font-medium tracking-wider inline-flex items-center gap-3 relative overflow-hidden cursor-pointer">
        <span className="relative z-10 text-[#000000] font-medium tracking-widest">EXPLORE</span>
      </button>
    }>
      <ExploreButtonContent />
    </Suspense>
  );
}
