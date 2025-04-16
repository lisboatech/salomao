'use client';

import React from 'react';

// Componente para exibir informações de calorias totais
const StatsInfo = ({ totalCalories }) => {
  return (
    <div className="fixed top-6 left-6 z-50 text-white font-light text-xl tracking-wide" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col">
        <span className="text-xs sm:text-sm text-white/60 uppercase tracking-widest mb-1">CALORIAS TOTAIS</span>
        <span className="text-2xl sm:text-3xl font-light">{totalCalories}</span>
      </div>
    </div>
  );
};

export default StatsInfo;
