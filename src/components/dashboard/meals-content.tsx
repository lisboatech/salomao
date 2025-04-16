'use client';

import { FilterBar } from './filter-bar';
import { MealCard } from './meal-card';

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

interface MealsContentProps {
  meals: Meal[];
  loading: boolean;
  error: string | null;
  filter: string | null;
  onFilterChange: (filter: string | null) => void;
  onAddMeal: () => void;
  onEditMeal: (meal: Meal) => void;
  onDeleteMeal: (id: string) => void;
}

export function MealsContent({
  meals,
  loading,
  error,
  filter,
  onFilterChange,
  onAddMeal,
  onEditMeal,
  onDeleteMeal
}: MealsContentProps) {
  // Filtrar refeições com base no tipo selecionado
  const filteredMeals = filter
    ? meals.filter((meal) => meal.type === filter)
    : meals;

  return (
    <div className="w-full">
      {/* Filtros no topo */}
      <div className="mb-8">
        <FilterBar
          onFilterChange={onFilterChange}
          currentFilter={filter}
        />
      </div>

      {/* Título e botão de adicionar */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-[0_0_8px_rgba(191,90,242,0.4)]">Suas Refeições</h2>
          <div className="h-[3px] w-28 bg-gradient-to-r from-purple-500/80 to-blue-500/80 mt-2 shadow-[0_0_8px_rgba(191,90,242,0.4)]"></div>
        </div>
        <button
          onClick={onAddMeal}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500/30 to-blue-500/30 hover:from-purple-500/50 hover:to-blue-500/50 border border-white/10 hover:border-white/20 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(191,90,242,0.2)] hover:shadow-[0_0_20px_rgba(191,90,242,0.4)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 1V11M1 6H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Adicionar</span>
        </button>
      </div>

      {/* Lista de refeições */}
      <div>
        {loading ? (
          <div className="text-center py-10 glass rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-inner">
            <p className="text-base font-light tracking-wide text-white/70">Carregando refeições<span className="animate-pulse">...</span></p>
          </div>
        ) : error ? (
          <div className="text-center py-10 glass rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-inner">
            <p className="text-base font-light tracking-wide text-red-400/90">{error}</p>
          </div>
        ) : filteredMeals.length === 0 ? (
          <div className="text-center py-10 glass rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-inner">
            <p className="text-base font-light tracking-wide text-white/70">Nenhuma refeição encontrada</p>
            <p className="text-xs text-white/50 mt-2">Clique em "Adicionar" para criar uma nova refeição</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 gap-y-10">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal._id}
                meal={meal}
                onEdit={onEditMeal}
                onDelete={onDeleteMeal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
