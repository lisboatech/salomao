import React from 'react';

export const SalomaoLogo: React.FC = () => {
  return (
    <div className="relative group hover:scale-105 transition-all duration-700 scale-75">
      <div className="relative z-10 flex items-center">
        <div className="flex tracking-[-0.01em]">
          <span className="text-[28px] font-thin uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/80 tracking-tight leading-none">S</span>
          <span className="text-[28px] font-thin uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/80 tracking-tight leading-none ml-[0.1em]">A</span>
          <span className="text-[28px] font-thin uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/80 tracking-tight leading-none ml-[0.1em]">L</span>
          <span className="text-[28px] font-thin uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/80 tracking-tight leading-none ml-[0.1em]">O</span>
          <span className="text-[28px] font-thin uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/80 tracking-tight leading-none ml-[0.1em]">M</span>
          <span className="text-[28px] font-thin uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/80 tracking-tight leading-none ml-[0.1em]">Ã</span>
          <span className="text-[28px] font-thin uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white/95 to-white/80 tracking-tight leading-none ml-[0.1em]">O</span>
        </div>

        {/* Linha decorativa premium */}
        <div className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C0A080]/90 to-transparent"></div>

        {/* Efeito de brilho sutil constante */}
        <div className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#C0A080]/20 blur-sm"></div>
      </div>

      {/* Efeito de brilho no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C0A080]/15 to-transparent opacity-0 group-hover:opacity-100 blur-md transition-all duration-700 z-0"></div>
    </div>
  );
};
