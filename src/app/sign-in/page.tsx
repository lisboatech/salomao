'use client';

import { SignIn } from "@stackframe/stack";
import { useEffect, useState } from 'react';
import { JaneLogo } from '@/components/ui/jane-logo';
import { BackToHomeButton } from '@/components/ui/back-to-home-button';

export default function CustomSignInPage() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {/* Imagem de gradiente e efeito de blur */}
      <img className="absolute top-0 right-0 opacity-50 -z-10" src="/gradient.png" alt="gradient" />
      <div className="absolute top-[20%] right-0 h-0 w-[30rem] shadow-[0_0_700px_15px_white] -rotate-[30deg] -z-10"></div>

      {/* Efeito de linhas horizontais sutis */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_8px] pointer-events-none"></div>

      {/* Layout principal centralizado */}
      <div className="container relative z-10 flex flex-col items-center justify-center w-full max-w-md px-6 py-10">

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6 text-center uppercase bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
          Acesse<br/>sua conta
        </h1>

        {/* Descrição */}
        <p className="text-base font-light tracking-wide text-white/70 mb-8 text-center max-w-sm leading-relaxed">
          Entre para gerenciar suas refeições, visualizar estatísticas e alcançar seus objetivos nutricionais.
        </p>

        {/* Componente de login do Stack Auth */}
        <div className="glass w-full p-8 mb-6 relative overflow-hidden">
          {/* Efeito de brilho sutil no topo */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* Efeito de brilho nos cantos */}
          <div className="absolute top-0 left-0 w-[40px] h-[40px] border-t border-l border-white/10 rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-[40px] h-[40px] border-t border-r border-white/10 rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-[40px] h-[40px] border-b border-l border-white/10 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-[40px] h-[40px] border-b border-r border-white/10 rounded-br-2xl"></div>

          {/* Efeito de reflexo diagonal sutil */}
          <div className="absolute -inset-full h-[500%] w-[500%] rotate-[-35deg] bg-gradient-to-tr from-white/0 via-white/[0.03] to-white/0 animate-[shine_10s_ease-in-out_infinite] pointer-events-none"></div>

          <SignIn />
        </div>

      {/* Botão de voltar para a landing page - estilo Apple */}
      <div className="fixed top-4 left-4 z-50">
        <BackToHomeButton />
      </div>

        {/* Logo JANE */}
        <div className="mt-8">
          <JaneLogo />
        </div>
      </div>
    </div>
  );
}
