'use client';

import { useEffect, Suspense, useState } from 'react';
import { useUser } from '@stackframe/stack';
import { ClientProvider } from '@/components/auth/client-provider';

// Componente interno que usa useUser
function AuthCallbackInner() {
  const user = useUser({ or: 'return' });

  useEffect(() => {
    // Adicionar um pequeno atraso para garantir que a sessão seja processada
    if (user) {
      const redirectTimer = setTimeout(() => {
        // Usar window.location.href para forçar um redirecionamento completo
        window.location.href = '/dashboard';
      }, 500);

      return () => clearTimeout(redirectTimer);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    </div>
  );
}

// Componente que usa ClientProvider
function AuthCallbackContent() {
  return (
    <ClientProvider>
      <AuthCallbackInner />
    </ClientProvider>
  );
}

// Componente principal com Suspense boundary
export default function AuthCallback() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

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
