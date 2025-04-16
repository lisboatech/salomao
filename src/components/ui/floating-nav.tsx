'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MealCard } from '@/components/dashboard/meal-card';

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

interface FloatingNavProps {
  onAddClick?: () => void;
  meals?: Meal[];
  loading?: boolean;
  error?: string | null;
  onEditMeal?: (meal: Meal) => void;
  onDeleteMeal?: (id: string) => void;
  currentFilter?: string | null;
  onFilterChange?: (filter: string | null) => void;
}

export function FloatingNav({ onAddClick, meals = [], loading = false, error = null, onEditMeal, onDeleteMeal, currentFilter = null, onFilterChange }: FloatingNavProps = {}) {
  const pathname = usePathname();
  const [activeApp, setActiveApp] = useState<string | null>(null);


  const openApp = (appName: string) => {
    setActiveApp(appName);
    document.body.classList.add('modal-open');
  };

  const closeApp = () => {
    setActiveApp(null);
    document.body.classList.remove('modal-open');
  };



  return (
    <div className="w-full h-full">
      <div>
        {/* Número de calorias acima dos ícones de aplicativos */}
        <div className="text-center mb-10 sm:mb-16 md:mb-20">
          <p className="text-4xl sm:text-5xl md:text-6xl font-extralight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 drop-shadow-[0_0_15px_rgba(191,90,242,0.6)]" style={{lineHeight: '1'}}>
            {meals.reduce((total, meal) => total + meal.calories, 0)}
          </p>
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-wider text-white/50">
              calorias
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 sm:gap-8 md:gap-12 justify-center mb-6">
          {/* Adicionar Refeições App */}
          <button
            className="group relative flex flex-col items-center"
            onClick={onAddClick}
          >
            <div className="tilt-card relative w-[80px] h-[80px] rounded-[20px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
              {/* Efeito de brilho superior premium */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              {/* Efeito de brilho lateral */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
              {/* Gradiente de fundo com toque de cor Apple */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <span className="text-sm sm:text-base text-white/70 mt-2 sm:mt-3">Adicionar</span>
          </button>

          {/* Estatísticas App */}
          <Link
            href="/statistics"
            className="group relative flex flex-col items-center"
          >
            <div className="tilt-card relative w-[80px] h-[80px] rounded-[20px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
              {/* Efeito de brilho superior premium */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              {/* Efeito de brilho lateral */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
              {/* Gradiente de fundo com toque de cor Apple */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <span className="text-sm sm:text-base text-white/70 mt-2 sm:mt-3">Estatísticas VR</span>
          </Link>

          {/* Cronologia Alimentar App */}
          <Link href="/timeline" className="group relative flex flex-col items-center">
            <div className="tilt-card relative w-[80px] h-[80px] rounded-[20px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
              {/* Efeito de brilho superior premium */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
              {/* Efeito de brilho lateral */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
              {/* Gradiente de fundo com toque de cor Apple */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
                <line x1="12" y1="22" x2="12" y2="18"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="6" y1="12" x2="2" y2="12"></line>
                <line x1="12" y1="6" x2="12" y2="2"></line>
              </svg>
            </div>
            <span className="text-sm sm:text-base text-white/70 mt-2 sm:mt-3">Cronologia</span>
          </Link>
        </div>

        {/* Modais de aplicativos */}



      </div>
    </div>
  );
}
