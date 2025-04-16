import { ReactNode } from 'react';
import { JaneLogo } from '@/components/ui/jane-logo';
import { FloatingNav } from '@/components/ui/floating-nav';
import { VoiceButton } from '@/components/voice/voice-button';
import { Meal } from './dashboard-hooks';

interface DashboardLayoutProps {
  children: ReactNode;
  filteredMeals: Meal[];
  loading: boolean;
  error: string | null;
  currentFilter: string | null;
  onAddClick: () => void;
  onEditMeal: (meal: Meal) => void;
  onDeleteMeal: (id: string) => void;
  onFilterChange: (filter: string | null) => void;
}

export function DashboardLayout({
  children,
  filteredMeals,
  loading,
  error,
  currentFilter,
  onAddClick,
  onEditMeal,
  onDeleteMeal,
  onFilterChange
}: DashboardLayoutProps) {
  return (
    <main className="h-screen bg-black text-white p-5 md:p-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header com logo */}
        <div className="flex flex-col">
          <header className="flex justify-between items-center px-5 py-4 md:px-20 md:py-4 mb-4 bg-black/20 backdrop-blur-sm rounded-xl">
            <div className="hover:opacity-80 transition-opacity duration-300">
              <JaneLogo />
            </div>
            <div className="w-[120px]"></div> {/* Espaçador para balancear o layout */}
          </header>
        </div>

        {/* Layout responsivo: Esfera e gerenciamento de refeições */}
        <div className="flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-32 mb-24 h-screen overflow-y-auto overflow-x-hidden lg:overflow-hidden mt-2">
          {/* Área esquerda: Esfera como elemento âncora */}
          <div className="w-full lg:w-1/3 flex flex-col items-center justify-start lg:sticky lg:top-0 lg:pl-16 mb-8 lg:mb-0">
            {/* Esfera de visualização com botão de voz */}
            <div className="relative w-full h-[450px] lg:h-[90vh] flex items-start justify-center mt-[10px] lg:mt-[20px] pt-[20px]">
              {/* Efeito de brilho em torno da esfera */}
              <div className="absolute inset-0 flex items-start justify-center pt-[30px] sm:pt-[40px] md:pt-[50px] lg:pt-[60px]">
                <div className="absolute -inset-4 bg-white/[0.02] blur-3xl rounded-full opacity-50"></div>
                <div className="relative scale-110 md:scale-125">
                  <VoiceButton />
                </div>
              </div>
            </div>
          </div>

          {/* Área direita: Navegação e features */}
          <div className="w-full lg:w-2/3 flex flex-col items-center">
            <div className="w-full flex flex-col items-center">
              <FloatingNav
                onAddClick={onAddClick}
                meals={filteredMeals}
                loading={loading}
                error={error}
                onEditMeal={onEditMeal}
                onDeleteMeal={onDeleteMeal}
                currentFilter={currentFilter}
                onFilterChange={onFilterChange}
              />

              {children}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </main>
  );
}