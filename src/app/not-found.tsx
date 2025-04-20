import React from 'react';
import Link from 'next/link';
import { SalomaoLogo } from '@/components/ui/salomao-logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-5 py-4 md:px-20 md:py-4">
        <div className="hover:opacity-80 transition-opacity duration-300">
          <SalomaoLogo />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full">
          <div className="tilt-card relative p-8 rounded-[28px] overflow-hidden backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 transition-all duration-700 ease-in-out">
            {/* Efeito de brilho superior premium */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C0A080]/60 to-transparent"></div>

            {/* Efeito de brilho lateral */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>

            {/* Gradiente de fundo com toque de cor */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#C0A080]/10 via-transparent to-[#C0A080]/5"></div>

            <div className="relative z-10 text-center">
              <h1 className="text-8xl font-extralight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                404
              </h1>

              <h2 className="text-2xl font-extralight tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                Página não encontrada
              </h2>

              <p className="text-white/70 mb-8">
                A página que você está procurando não existe ou foi removida.
              </p>

              <Link
                href="/"
                className="bg-[#F5F5F7] px-6 py-3 rounded-full text-base font-medium tracking-wider inline-flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden"
              >
                {/* Efeito metálico sutil */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-black/5"></div>

                {/* Borda sutil */}
                <div className="absolute inset-0 rounded-full border border-white/40"></div>

                {/* Sombra interna */}
                <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]"></div>

                <span className="relative z-10 text-[#000000] font-medium tracking-wider">
                  Voltar para a página inicial
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
