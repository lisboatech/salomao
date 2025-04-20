'use client';

import { useRouter } from 'next/navigation';

export function BackToLandingButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/');
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#F5F5F7] px-6 py-2 rounded-full text-sm font-medium tracking-wider inline-flex items-center gap-2 hover:shadow-[0_0_15px_rgba(192,160,128,0.5)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tilt-card relative overflow-hidden group cursor-pointer"
    >
      {/* Efeito metálico dourado sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4B78F]/20 via-[#C0A080]/15 to-[#A89070]/10"></div>

      {/* Borda sutil dourada */}
      <div className="absolute inset-0 rounded-full border border-[#C0A080]/30"></div>

      {/* Sombra interna */}
      <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]"></div>

      {/* Seta minimalista estilo Apple - apontando para a esquerda */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform group-hover:-translate-x-1 transition-transform duration-300">
        <path d="M19 12H5" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 6L5 12L11 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>

      <span className="relative z-10 text-[#000000] font-medium tracking-wider">VOLTAR</span>
    </button>
  );
}
