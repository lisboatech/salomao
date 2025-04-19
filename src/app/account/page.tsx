'use client';

import { AccountSettings, useUser } from "@stackframe/stack";
import { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/loader';
import { BackButton } from '@/components/ui/back-button';
import { ClientProvider } from '@/components/auth/client-provider';

// Componente interno que usa useUser
function AccountInner() {
  const user = useUser({ or: 'return' });
  const router = useRouter();

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (user === null) {
      router.push('/sign-in');
    }
  }, [user, router]);

  // Se não houver usuário, mostrar loader
  if (user === null) {
    return <Loader message="Verificando autenticação..." />;
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Imagem de gradiente e efeito de blur */}
      <img className="absolute top-0 right-0 opacity-50 -z-10" src="/gradient.png" alt="gradient" />
      <div className="absolute top-[20%] right-0 h-0 w-[30rem] shadow-[0_0_700px_15px_white] -rotate-[30deg] -z-10"></div>

      {/* Efeito de linhas horizontais sutis */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none"></div>

      {/* Header com botão de voltar - estilo consistente com o resto da aplicação */}
      <header className="flex justify-between items-center px-3 xs:px-4 sm:px-5 py-6 xs:py-8 md:px-10 md:py-10">
        <div className="flex items-center">
          {/* Botão de voltar ao dashboard */}
          <BackButton href="/dashboard" label="Voltar ao Dashboard" />
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Título da página */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extralight tracking-tight uppercase bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Configurações
          </h1>
          <p className="text-base font-light tracking-wide text-white/70 mt-2 max-w-lg mx-auto">
            Gerencie suas informações pessoais e preferências de conta
          </p>
        </div>

        {/* Componente de configurações de conta personalizado */}
        <div className="glass p-6 rounded-xl max-w-5xl mx-auto relative overflow-hidden">
          {/* Efeito de brilho sutil no topo */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Efeito de reflexo diagonal sutil */}
          <div className="absolute -inset-full h-[500%] w-[500%] rotate-[-35deg] bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 animate-[shine_10s_ease-in-out_infinite] pointer-events-none"></div>

          <AccountSettings
            fullPage={false}
          />
        </div>
      </main>
    </div>
  );
}

// Componente que usa ClientProvider
function AccountContent() {
  return (
    <ClientProvider>
      <AccountInner />
    </ClientProvider>
  );
}

// Componente principal com Suspense boundary
export default function AccountPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader message="Carregando configurações..." />;
  }

  return (
    <Suspense fallback={<Loader message="Carregando configurações..." />}>
      <AccountContent />
    </Suspense>
  );
}
