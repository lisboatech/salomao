'use client';

import Link from 'next/link';
import { Suspense } from 'react';

// Componente interno
function BackToHomeButtonContent() {
  return (
    <Link href="/">
      <button
        className="bg-[#F5F5F7]/5 hover:bg-[#F5F5F7]/15 px-4 py-2.5 rounded-md text-sm font-medium inline-flex items-center gap-2 transition-all duration-300 relative overflow-hidden group shadow-sm shadow-white/5 cursor-pointer"
      >


        {/* Seta minimalista estilo Apple - apontando para a esquerda */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative transform group-hover:-translate-x-0.5 transition-transform duration-300">
          <path d="M19 12H5" stroke="#F5F5F7" strokeWidth="2" strokeLinecap="round"/>
          <path d="M11 6L5 12L11 18" stroke="#F5F5F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <span className="text-[#F5F5F7] font-medium text-sm">Voltar</span>
      </button>
    </Link>
  );
}

// Componente principal com Suspense boundary
export function BackToHomeButton() {
  return (
    <Suspense fallback={
      <button className="bg-[#F5F5F7]/5 px-4 py-2.5 rounded-md text-sm font-medium inline-flex items-center gap-2 relative overflow-hidden shadow-sm shadow-white/5 cursor-pointer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5" stroke="#F5F5F7" strokeWidth="2" strokeLinecap="round"/>
          <path d="M11 6L5 12L11 18" stroke="#F5F5F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-[#F5F5F7] font-medium text-sm">Voltar</span>
      </button>
    }>
      <BackToHomeButtonContent />
    </Suspense>
  );
}
