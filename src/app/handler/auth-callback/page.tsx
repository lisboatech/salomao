'use client';

import { useEffect, Suspense, useState } from 'react';
import { useUser } from '@stackframe/stack';

// Componente interno que usa useUser de forma segura
function AuthCallbackContent() {
  const [isClient, setIsClient] = useState(false);

  // Usar try/catch para evitar erros durante o build
  let user = null;
  try {
    // Tentar obter o usuário apenas no cliente
    if (typeof window !== 'undefined') {
      user = useUser({ or: 'return' });
    }
  } catch (error) {
    // Silenciar o erro durante o build
  }

  // Verificar se estamos no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Adicionar um pequeno atraso para garantir que a sessão seja processada
    if (isClient && user) {
      const redirectTimer = setTimeout(() => {
        // Usar window.location.href para forçar um redirecionamento completo
        window.location.href = '/dashboard';
      }, 500);

      return () => clearTimeout(redirectTimer);
    }
  }, [user, isClient]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}

// Componente principal com Suspense boundary
export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
