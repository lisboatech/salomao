'use client';

import { StackProvider, StackTheme } from '@stackframe/stack';
import { stackServerApp } from '@/stack';
import { ReactNode, useEffect, useState } from 'react';

interface ClientProviderProps {
  children: ReactNode;
}

export function ClientProvider({ children }: ClientProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <StackProvider app={stackServerApp} lang="pt-BR">
      <StackTheme theme={{
        light: {
          background: '#000000',
          foreground: '#FFFFFF',
          card: '#111111',
          cardForeground: '#FFFFFF',
          popover: '#111111',
          popoverForeground: '#FFFFFF',
          primary: '#007AFF',        // Azul Apple
          primaryForeground: '#FFFFFF',
          secondary: '#5E5CE6',      // Roxo Apple
          secondaryForeground: '#FFFFFF',
          muted: '#333333',
          mutedForeground: '#999999',
          accent: '#32ADE6',         // Azul claro Apple
          accentForeground: '#FFFFFF',
          destructive: '#FF453A',    // Vermelho Apple
          destructiveForeground: '#FFFFFF',
          border: '#333333',
          input: '#333333',
          ring: '#007AFF'
        },
        dark: {
          background: '#000000',
          foreground: '#FFFFFF',
          card: '#111111',
          cardForeground: '#FFFFFF',
          popover: '#111111',
          popoverForeground: '#FFFFFF',
          primary: '#007AFF',        // Azul Apple
          primaryForeground: '#FFFFFF',
          secondary: '#5E5CE6',      // Roxo Apple
          secondaryForeground: '#FFFFFF',
          muted: '#333333',
          mutedForeground: '#999999',
          accent: '#32ADE6',         // Azul claro Apple
          accentForeground: '#FFFFFF',
          destructive: '#FF453A',    // Vermelho Apple
          destructiveForeground: '#FFFFFF',
          border: '#333333',
          input: '#333333',
          ring: '#007AFF'
        },
        radius: '12px'
      }}>
        {children}
      </StackTheme>
    </StackProvider>
  );
}
