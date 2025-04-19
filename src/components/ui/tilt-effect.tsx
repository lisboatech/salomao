'use client';

import { useEffect } from 'react';

export default function TiltEffect() {
  useEffect(() => {
    // Função para aplicar o efeito de tilt
    const applyTiltEffect = () => {
      const tiltCards = document.querySelectorAll('.tilt-card');
      
      tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = (card as HTMLElement).getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const deltaX = (x - centerX) / centerX;
          const deltaY = (y - centerY) / centerY;
          
          const tiltX = deltaY * 5; // Reduzido para um efeito mais sutil
          const tiltY = -deltaX * 5;
          
          (card as HTMLElement).style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
          (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
      });
    };
    
    // Aplicar o efeito quando o componente montar
    applyTiltEffect();
    
    // Reaplica o efeito quando o DOM muda (para elementos dinâmicos)
    const observer = new MutationObserver(applyTiltEffect);
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Limpar o observer quando o componente desmontar
    return () => observer.disconnect();
  }, []);
  
  return null;
}
