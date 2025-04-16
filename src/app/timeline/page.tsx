'use client';

import { useEffect, useState } from 'react';
// Removido import do router pois agora está no componente TimelineFuturistic
import TimelineFuturistic from '@/components/timeline/timeline';
import Loader from '@/components/ui/loader';

export default function TimelinePage() {
  // Removido router
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar refeições do banco de dados
    const fetchMeals = async () => {
      try {
        console.log('Carregando refeições para a página de cronologia...');
        const response = await fetch('/api/meals', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Refeições carregadas com sucesso:', data.length);
          setMeals(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Erro ao carregar refeições:', error);
        setMeals([]);
      } finally {
        console.log('Finalizando carregamento de refeições');
        setLoading(false);
      }
    };

    fetchMeals();

    // Limpar ao desmontar
    return () => {
      setMeals([]);
      console.log('Limpando página de cronologia');
    };
  }, []);


  if (loading) {
    return <Loader message="Carregando cronologia..." />;
  }

  return <TimelineFuturistic meals={meals} />;
}
