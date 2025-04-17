'use client';

import React, { ReactNode } from 'react';

interface AppIconProps {
  children: ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

export function AppIcon({ children, label, onClick, href }: AppIconProps) {
  const iconContent = (
    <>
      <div className="tilt-card relative w-[70px] h-[70px] xs:w-[80px] xs:h-[80px] sm:w-[90px] sm:h-[90px] rounded-[18px] sm:rounded-[22px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_30px_rgba(191,90,242,0.3)] group-hover:scale-105 transition-all duration-500 ease-out">
        {/* Efeito de brilho superior premium */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

        {/* Efeito de brilho lateral */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>

        {/* Gradiente de fundo com toque de cor Apple */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>

        {/* Ícone */}
        {children}
      </div>
      <span className="text-xs sm:text-sm text-white/70 mt-2 sm:mt-3 font-light tracking-wide">{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button className="group relative flex flex-col items-center" onClick={onClick}>
        {iconContent}
      </button>
    );
  }

  if (href) {
    return (
      <a href={href} className="group relative flex flex-col items-center">
        {iconContent}
      </a>
    );
  }

  return <div className="group relative flex flex-col items-center">{iconContent}</div>;
}
