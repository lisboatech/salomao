'use client';

import { useEffect, useState, Suspense } from 'react';
// Removido import do router pois agora está no componente ThreeStatsView
import ThreeStatsView from '@/components/stats/stats';
import Loader from '@/components/ui/loader';
import { useUser } from '@stackframe/stack';

// Componente interno que usa useUser
function StatisticsContent() {
  // Proteger a página - redirecionar para login se não estiver autenticado
  useUser({ or: 'redirect' });

  // Removido router
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar refeições do banco de dados
    const fetchMeals = async () => {
      try {
        console.log('Carregando refeições para a página de estatísticas...');
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
      console.log('Limpando página de estatísticas');
    };
  }, []);

  // O botão de voltar agora está no componente ThreeStatsView

  if (loading) {
    return <Loader message="Carregando estatísticas..." />;
  }

  return <ThreeStatsView meals={meals} />;
}

// Componente principal com Suspense boundary
export default function StatisticsPage() {
  return (
    <Suspense fallback={<Loader message="Carregando estatísticas..." />}>
      <StatisticsContent />
    </Suspense>
  );
}