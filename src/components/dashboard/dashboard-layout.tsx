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
    <main className="h-screen bg-black text-white p-3 xs:p-4 sm:p-5 md:p-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header com logo - transparente e discreto */}
        <div className="flex flex-col">
          <header className="flex justify-between items-center px-3 xs:px-4 sm:px-5 py-2 xs:py-3 md:px-10 md:py-3 mb-3 sm:mb-4 bg-black/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
            <div className="hover:opacity-80 transition-opacity duration-300">
              <JaneLogo />
            </div>
            <a href="/" className="bg-[#F5F5F7] px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wider inline-flex items-center gap-1 sm:gap-2 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 relative overflow-hidden group">
              {/* Efeito metálico sutil */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-black/5"></div>

              {/* Borda sutil */}
              <div className="absolute inset-0 rounded-full border border-white/40"></div>

              {/* Sombra interna */}
              <div className="absolute inset-0 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]"></div>

              {/* Seta minimalista estilo Apple (invertida) */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 transform group-hover:-translate-x-0.5 transition-transform duration-300">
                <path d="M19 12H5" stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                <path d="M11 6L5 12L11 18" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              <span className="relative z-10 text-[#000000] font-medium tracking-wider text-xs sm:text-sm">VOLTAR</span>
            </a>
          </header>
        </div>

        {/* Contador de calorias premium estilo Apple - posicionado no topo centralizado */}
        <div className="absolute top-[80px] sm:top-[100px] left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
          <div className="text-center backdrop-blur-sm bg-black/5 px-6 sm:px-10 py-3 sm:py-4 rounded-2xl sm:rounded-3xl border-t border-l border-white/5 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <div className="text-4xl sm:text-5xl font-thin tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#BF5AF2]/90 to-[#0A84FF]/90 mb-1" style={{letterSpacing: '-0.02em'}}>
              {filteredMeals.reduce((total, meal) => total + meal.calories, 0)}
            </div>
            <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-white/50 font-light">
              calorias
            </div>
          </div>
        </div>

        {/* Layout premium estilo Apple: Esfera e gerenciamento de refeições */}
        <div className="flex flex-col lg:flex-row lg:items-center h-[calc(100vh-120px)] overflow-hidden mt-2 sm:mt-4">
          {/* Área esquerda: Esfera como elemento âncora - estilo Apple */}
          <div className="w-full lg:w-[45%] flex flex-col items-center lg:sticky lg:top-0 mb-4 lg:mb-0 lg:h-[calc(100vh-120px)]">
            {/* Esfera de visualização com botão de voz - posicionada mais acima */}
            <div className="relative w-full flex items-center justify-center h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] mt-8 xs:mt-10 sm:mt-12 md:mt-10 lg:mt-8">
              {/* Efeito de brilho sutil em torno da esfera */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute -inset-4 bg-white/[0.01] blur-3xl rounded-full opacity-30"></div>
                <div className="relative">
                  <VoiceButton />
                </div>
              </div>
            </div>
          </div>

          {/* Área direita: Navegação e features */}
          <div className="w-full lg:w-[55%] flex flex-col items-center justify-center lg:pl-12 lg:h-[calc(100vh-120px)]">
            <div className="w-full flex flex-col items-center max-w-[550px] mx-auto">
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