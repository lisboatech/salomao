'use client';

import { useState } from 'react';

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

interface MealCardProps {
  meal: Meal;
  onEdit?: (meal: Meal) => void;
  onDelete?: (id: string) => void;
}

export function MealCard({ meal, onEdit, onDelete }: MealCardProps) {
  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="relative group">
      {/* Card com efeito premium ultra-futurista estilo Apple */}
      <div className="tilt-card relative w-[320px] h-[420px] mx-7 my-8 rounded-[28px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
        {/* Efeito de brilho superior premium */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

        {/* Efeito de brilho lateral */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>

        {/* Gradiente de fundo com toque de cor Apple */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>

        {/* Reflexo de luz sutil */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl transform rotate-45"></div>

        <div className="p-10 text-center relative z-10 flex flex-col items-center justify-center h-full">
          {/* Tipo de refeição centralizado na parte superior */}
          <div className="absolute top-8 left-0 right-0 flex justify-center">
            <span className="text-xs px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white/90 shadow-[0_0_10px_rgba(255,255,255,0.05)]">{meal.type}</span>
          </div>

          {/* Título com estilo premium */}
          <h3 className="text-2xl font-bold tracking-wide mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">{meal.name}</h3>

          {/* Separador elegante */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#BF5AF2]/80 to-transparent mb-8"></div>

          {/* Descrição com máxima legibilidade */}
          <p className="text-white/95 text-base leading-relaxed font-light max-w-[85%] tracking-wide">
            {meal.description || `${meal.calories} calorias`}
          </p>

          {/* Data e horário */}
          <p className="text-white/70 text-sm mt-3">
            {formatDate(meal.dateTime)}
          </p>

          {/* Link para editar a refeição */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (onEdit) {
                  window.location.href = `/dashboard/edit/${meal._id}`;
                }
              }}
              className="text-xs px-4 py-1 bg-white/10 hover:bg-white/15 rounded-full transition-all duration-300 text-white/80 hover:text-white tracking-wide border border-white/20"
            >
              Editar
            </a>

            {onDelete && (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (onDelete) {
                    onDelete(meal._id);
                  }
                }}
                className="text-xs px-4 py-1 bg-white/10 hover:bg-red-500/20 rounded-full transition-all duration-300 text-white/80 hover:text-white tracking-wide border border-white/20"
              >
                Excluir
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}