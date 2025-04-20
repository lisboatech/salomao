'use client';

import React from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Carregando visualização...' }) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Loader com cores douradas do projeto Salomão */}
        <div className="relative">
          {/* Spinner principal com gradiente dourado */}
          <div className="w-16 h-16 border-t-2 border-b-2 border-[#C0A080] rounded-full animate-spin mb-4"></div>

          {/* Efeito de brilho sutil */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-b-2 border-[#D4B78F]/30 rounded-full animate-spin mb-4"
               style={{ animationDuration: '1.5s' }}></div>

          {/* Efeito de glow dourado */}
          <div className="absolute top-0 left-0 w-16 h-16 rounded-full shadow-[0_0_15px_rgba(192,160,128,0.3)]"></div>
        </div>

        {/* Mensagem com estilo premium */}
        <div className="text-white/90 text-lg font-light tracking-wide mt-6">{message}</div>
      </div>
    </div>
  );
};

export default Loader;
