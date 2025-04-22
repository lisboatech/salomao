'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function StatusBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();

  // Mostrar o banner apenas na página /ia
  const shouldShowBanner = pathname === '/ia';

  // Efeito para verificar se o banner deve ser exibido
  useEffect(() => {
    // Verificar se o usuário já fechou o banner antes
    const bannerClosed = localStorage.getItem('salomao_banner_closed');
    if (bannerClosed) {
      setIsVisible(false);
    }
  }, []);

  // Função para fechar o banner e salvar a preferência
  const closeBanner = () => {
    setIsVisible(false);
    localStorage.setItem('salomao_banner_closed', 'true');
  };

  if (!shouldShowBanner || !isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#C0A080]/20 via-[#C0A080]/30 to-[#C0A080]/20 backdrop-blur-md border-b border-[#C0A080]/30 py-3 px-4 text-center">
      <div className="max-w-4xl mx-auto flex items-center justify-center relative">
        <p className="text-white/90 text-sm font-light tracking-wide text-center">
          <span className="inline-block mr-2 h-2 w-2 rounded-full bg-[#C0A080] animate-pulse"></span>
          Salomão está na fase de desenvolvimento.
        </p>
        <button
          onClick={closeBanner}
          className="absolute right-0 text-white/70 hover:text-white transition-colors duration-300"
          aria-label="Fechar aviso"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
