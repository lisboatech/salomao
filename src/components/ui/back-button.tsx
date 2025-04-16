'use client';

import React from 'react';
import Link from 'next/link';

interface BackButtonProps {
  href: string;
  label?: string;
}

export function BackButton({ href, label = 'Voltar ao Dashboard' }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="group py-2.5 px-5 bg-black/40 hover:bg-black/60 active:bg-black/80 backdrop-blur-xl border-[0.5px] border-white/10 rounded-full text-white/90 text-xs font-light tracking-wide transition-all duration-300 cursor-pointer flex items-center shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5 mr-2 text-white/70 group-hover:text-white/90 transition-all duration-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span className="relative top-[0.5px]">{label}</span>
    </Link>
  );
}
