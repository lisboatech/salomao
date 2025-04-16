'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { MealForm } from '@/components/dashboard/meal-form';
import { Modal } from '@/components/ui/modal';
import { JaneLogo } from '@/components/ui/jane-logo';

interface Meal {
  _id: string;
  name: string;
  description?: string;
  calories: number;
  dateTime: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface PageProps {
  params: { id: string };
}

export default function EditMealPage({ params }: PageProps) {
  // Usar React.use para acessar params
  const resolvedParams = use(params);
  const router = useRouter();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar refeição pelo ID
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const id = resolvedParams.id;
        if (!id) {
          throw new Error('ID não fornecido');
        }

        const response = await fetch(`/api/meals/${id}`);

        if (!response.ok) {
          throw new Error('Falha ao buscar refeição');
        }

        const data = await response.json();
        setMeal(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
        setLoading(false);
      }
    };

    fetchMeal();
  }, []);

  // Estado para mostrar o card atualizado
  const [updatedMeal, setUpdatedMeal] = useState<Meal | null>(null);
  const [showUpdated, setShowUpdated] = useState(false);

  // Salvar refeição (atualizar)
  const handleSaveMeal = async (mealData: Omit<Meal, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (meal) {
        // Atualizar refeição existente
        const response = await fetch(`/api/meals/${meal._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mealData)
        });

        if (!response.ok) {
          throw new Error('Falha ao atualizar refeição');
        }

        // Obter a refeição atualizada
        const updatedData = await response.json();
        setUpdatedMeal(updatedData);
        setShowUpdated(true);

        // Aguardar 2 segundos antes de redirecionar
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      }
    } catch (err) {
      console.error('Erro ao salvar refeição:', err);
      setError(err instanceof Error ? err.message : 'Erro ao salvar refeição');
    }
  };

  return (
    <main className="h-screen bg-black text-white p-5 md:p-10 flex items-start justify-center pt-10">
      <div className="max-w-7xl w-full">

        <div className="flex justify-center items-center">
          <div className="w-full max-w-2xl">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-16 h-16 border-t-2 border-b-2 border-purple-500/50 rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center py-6">
                  <p className="text-red-400/80 text-lg font-light tracking-wide">{error}</p>
                </div>
              </div>
            ) : showUpdated && updatedMeal ? (
              <div className="glass w-full p-8 rounded-3xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="text-center py-6">
                  <div className="w-16 h-16 text-green-400 mx-auto mb-4">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-light text-white mb-4">Refeição Atualizada!</h2>
                  <div className="tilt-card relative w-[320px] h-[420px] mx-auto rounded-[28px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all duration-700 ease-in-out">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                    <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl transform rotate-45"></div>
                    <div className="p-10 text-center relative z-10 flex flex-col items-center justify-center h-full">
                      <div className="absolute top-8 left-0 right-0 flex justify-center">
                        <span className="text-xs px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/90 shadow-[0_0_10px_rgba(255,255,255,0.05)]">{updatedMeal.type}</span>
                      </div>
                      <h3 className="text-2xl font-bold tracking-wide mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">{updatedMeal.name}</h3>
                      <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#BF5AF2]/80 to-transparent mb-8"></div>
                      <p className="text-white/95 text-base leading-relaxed font-light max-w-[85%] tracking-wide">
                        {updatedMeal.description || `${updatedMeal.calories} calorias`}
                      </p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm mt-6">Redirecionando para o dashboard...</p>
                </div>
              </div>
            ) : meal ? (
              <div className="glass w-full p-8 rounded-3xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>

                <div className="relative flex justify-between items-center mb-6 pb-3 border-b border-white/10">
                  <h2 className="text-2xl font-light tracking-wide text-white">Editar Refeição</h2>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="p-2 text-white/60 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5"
                    aria-label="Voltar"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                <div className="relative z-10 max-h-[calc(100vh-200px)]">
                  <MealForm
                    meal={meal}
                    onSubmit={handleSaveMeal}
                    onCancel={() => router.push('/dashboard')}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center py-6">
                  <p className="text-white/80 text-lg font-light tracking-wide">Refeição não encontrada</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
