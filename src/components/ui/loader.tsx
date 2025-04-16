'use client';

import React from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = 'Carregando visualização...' }) => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-2 border-b-2 border-purple-500/50 rounded-full animate-spin mb-4"></div>
        <div className="text-white text-xl">{message}</div>
      </div>
    </div>
  );
};

export default Loader;
