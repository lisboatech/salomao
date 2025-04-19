'use client';

import { useEffect } from 'react';

export default function HydrationFix() {
  useEffect(() => {
    // Remove atributos adicionados por extensões de navegador
    // que podem causar erros de hidratação
    const body = document.querySelector('body');
    if (body) {
      // Lista de atributos a serem removidos
      const attributesToRemove = [
        'data-atm-ext-installed',
        'data-atm-ext-version',
        // Adicione outros atributos conforme necessário
      ];

      attributesToRemove.forEach(attr => {
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });
    }
  }, []);

  return null;
}
