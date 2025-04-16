'use client'

import React from 'react'
import Link from 'next/link'
import { JaneLogo } from '../ui/jane-logo'

export default function Header() {
  return (
    <header className="flex justify-between items-center px-5 py-4 md:px-20 md:py-4 fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <div className="hover:opacity-80 transition-opacity duration-300">
        <JaneLogo />
      </div>
      {/* Espaço vazio para manter o layout */}
      <div className="w-[120px]"></div>
    </header>
  )
}
