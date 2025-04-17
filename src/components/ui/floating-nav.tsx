'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MealCard } from '@/components/dashboard/meal-card';
import { AppIcon } from '@/components/ui/app-icon';

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


        {/* Grid de aplicativos estilo Apple */}
        <div className="grid grid-cols-3 gap-4 xs:gap-6 sm:gap-8 md:gap-12 lg:gap-16 justify-items-center mb-10 sm:mb-16 -mt-6 sm:-mt-12 md:-mt-16 lg:-mt-20">
          {/* Adicionar Refeições App */}
          <AppIcon label="Adicionar" onClick={onAddClick}>
            <svg width="24" height="24" className="sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </AppIcon>

          {/* Estatísticas App */}
          <AppIcon label="Estatísticas VR" href="/statistics">
            <svg width="24" height="24" className="sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </AppIcon>

          {/* Cronologia Alimentar App */}
          <AppIcon label="Cronologia" href="/timeline">
            <svg width="24" height="24" className="sm:w-[28px] sm:h-[28px] md:w-[32px] md:h-[32px]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </AppIcon>
        </div>

        {/* Modais de aplicativos */}



      </div>
    </div>
  );
}
