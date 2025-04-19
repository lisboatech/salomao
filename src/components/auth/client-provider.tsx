'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ClientProviderProps {
  children: ReactNode;
}

// Este componente agora apenas garante que o conteúdo seja renderizado apenas no cliente
export function ClientProvider({ children }: ClientProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
