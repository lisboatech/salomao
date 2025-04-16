// jane-front/src/components/ui/modal.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function Modal({ isOpen, onClose, children, title, className }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Fechar modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevenir scroll do body quando modal estiver aberto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md">
      <div
        ref={modalRef}
        className={cn(
          "glass w-full max-w-4xl p-8 rounded-3xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] animate-in fade-in duration-300 overflow-hidden",
          className
        )}
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>

        <div className="relative flex justify-between items-center mb-6 pb-3 border-b border-white/10">
          {title && (
            <h2 className="text-2xl font-light tracking-wide text-white">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5"
            aria-label="Fechar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
}