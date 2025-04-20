'use client'

import React from 'react'

export default function Footer() {
  return (
    <footer className="py-8 bg-black relative">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="container mx-auto px-6 text-center">
        <p className="text-white/40 text-sm font-light tracking-wide">
          &copy; {new Date().getFullYear()} Salomão - Inteligência Empresarial. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
