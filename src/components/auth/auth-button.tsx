'use client';

import { useUser, UserButton } from "@stackframe/stack";
import { Suspense } from "react";

// Componente interno que usa useUser
function AuthButtonContent() {
  const user = useUser();

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

// Componente principal com Suspense boundary
export function AuthButton() {
  return (
    <Suspense fallback={null}>
      <AuthButtonContent />
    </Suspense>
  );
}
