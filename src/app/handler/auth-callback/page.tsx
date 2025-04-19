'use client';

import { useEffect, Suspense } from 'react';
import { useUser } from '@stackframe/stack';

// Componente interno que usa useUser
function AuthCallbackContent() {
  const user = useUser();

  useEffect(() => {
    // Adicionar um pequeno atraso para garantir que a sessão seja processada
    const redirectTimer = setTimeout(() => {
      if (user) {
        // Usar window.location.href para forçar um redirecionamento completo
        window.location.href = '/dashboard';
      }
    }, 500);

    return () => clearTimeout(redirectTimer);
  }, [user]);

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
