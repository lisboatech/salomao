'use client';

import React from 'react';

interface ShareButtonProps {
  onClick: () => void;
  label?: string;
}

export function ShareButton({ onClick, label = 'Compartilhar' }: ShareButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className="group py-2.5 px-5 bg-black/40 hover:bg-black/60 active:bg-black/80 backdrop-blur-xl border-[0.5px] border-white/10 rounded-full text-white/90 text-xs font-light tracking-wide transition-all duration-300 cursor-pointer flex items-center shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]"
      title="Compartilhar estatísticas"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-3.5 w-3.5 mr-2 text-white/70 group-hover:text-white/90 transition-all duration-300" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      <span className="relative top-[0.5px]">{label}</span>
    </button>
  );
}
