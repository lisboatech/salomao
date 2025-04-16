'use client';

import React from 'react';

// Componente para o toast de compartilhamento
const ShareToast = ({ show }) => {
  if (!show) return null;
  
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-xl px-4 py-3 rounded-xl border border-white/20 shadow-lg flex items-center space-x-2 animate-fade-in-out">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="text-white text-sm font-light">Link copiado para a área de transferência</span>
    </div>
  );
};

export default ShareToast;
