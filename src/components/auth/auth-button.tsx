'use client';

import { useUser, UserButton } from "@stackframe/stack";
import { Suspense, useEffect, useState } from "react";
import { ClientProvider } from "./client-provider";

// Componente interno que usa useUser
function AuthButtonInner() {
  const user = useUser({ or: 'return' });

  // Se o usuário estiver autenticado, mostrar apenas o botão de usuário
  if (user) {
    return (
      <div className="flex items-center">
        <UserButton />
      </div>
    );
  }

  // Se não estiver autenticado, não mostrar nada no header
  return null;
}

// Componente que usa ClientProvider
function AuthButtonContent() {
  return (
    <ClientProvider>
      <AuthButtonInner />
    </ClientProvider>
  );
}

// Componente principal com Suspense boundary
export function AuthButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AuthButtonContent />
    </Suspense>
  );
}
