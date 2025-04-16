'use client';

import React from 'react';

// Componente para o link de marketing na visualização compartilhada
const SharedViewLink = () => {
  return (
    <a
      href="/"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 text-white/70 hover:text-white text-xs sm:text-sm font-light transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center bg-black/20 hover:bg-black/30 active:bg-black/40 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
    >
      <span className="mr-1">Gerado com</span>
      <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Jane</span>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
};

export default SharedViewLink;
