'use client';

import { ReactNode, useEffect, useState } from 'react';

interface MealsOverlayProps {
  isActive: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function MealsOverlay({ isActive, onClose, children }: MealsOverlayProps) {
  const [animation, setAnimation] = useState('opacity-0');

  useEffect(() => {
    if (isActive) {
      // Pequeno atraso para permitir que a animação ocorra
      setTimeout(() => {
        setAnimation('opacity-100');
      }, 10);
    } else {
      setAnimation('opacity-0');
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div
      className={`fixed inset-0 z-30 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${animation}`}
      onClick={onClose}
    >
      {/* Conteúdo da camada sobreposta que mantém a estrutura original */}
      <div
        className="absolute inset-0 flex flex-col pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho com título e botão de fechar */}
        <div className="w-full flex justify-between items-center px-5 py-4 md:px-8 md:py-4 pointer-events-auto">
          <div></div> {/* Espaçador para manter o título centralizado */}
          <h2 className="text-xl font-light tracking-wide text-white/90 bg-black/40 px-4 py-2 rounded-full backdrop-blur-md">
            Gerenciamento de Refeições
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-white/10 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Conteúdo principal que mantém a estrutura esfera à esquerda e controles à direita */}
        <div className="flex-1 flex flex-col lg:flex-row gap-32 p-5 md:p-10">
          {/* Área esquerda - mantém a esfera visível */}
          <div className="lg:w-1/3 pointer-events-none">
            {/* Espaço reservado para a esfera que já está na interface principal */}
          </div>

          {/* Área direita - conteúdo de refeições */}
          <div className="lg:w-2/3 pointer-events-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
