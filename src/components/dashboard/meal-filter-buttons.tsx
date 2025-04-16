import { Meal } from './dashboard-hooks';

interface MealFilterButtonsProps {
  selectedFilterType: string | null;
  handleFilterClick: (filterType: string) => void;
}

export function MealFilterButtons({ selectedFilterType, handleFilterClick }: MealFilterButtonsProps) {
  return (
    <div className="mt-8 w-full flex justify-center">
      <div className="flex flex-wrap gap-6 justify-center">
        {/* Café da manhã */}
        <button
          key="cafe"
          onClick={() => handleFilterClick('Café da manhã')}
          className="group relative flex flex-col items-center"
          title="Café da manhã"
        >
          <div className="tilt-card relative w-[80px] h-[80px] rounded-[20px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
            {/* Efeito de brilho superior premium */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            {/* Efeito de brilho lateral */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
            {/* Gradiente de fundo com toque de cor Apple */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>
            {/* Reflexo de luz sutil */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl transform rotate-45"></div>

            <div className={`relative z-10 ${selectedFilterType === 'Café da manhã' ? 'text-white' : 'text-white/80'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-white/70 mt-2">Café</span>
        </button>

        {/* Almoço */}
        <button
          key="almoco"
          onClick={() => handleFilterClick('Almoço')}
          className="group relative flex flex-col items-center"
          title="Almoço"
        >
          <div className="tilt-card relative w-[80px] h-[80px] rounded-[20px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
            {/* Efeito de brilho superior premium */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            {/* Efeito de brilho lateral */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
            {/* Gradiente de fundo com toque de cor Apple */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>
            {/* Reflexo de luz sutil */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl transform rotate-45"></div>

            <div className={`relative z-10 ${selectedFilterType === 'Almoço' ? 'text-white' : 'text-white/80'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2" />
                <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-white/70 mt-2">Almoço</span>
        </button>

        {/* Lanche da tarde */}
        <button
          key="lanche"
          onClick={() => handleFilterClick('Lanche da tarde')}
          className="group relative flex flex-col items-center"
          title="Lanche da tarde"
        >
          <div className="tilt-card relative w-[80px] h-[80px] rounded-[20px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
            {/* Efeito de brilho superior premium */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            {/* Efeito de brilho lateral */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
            {/* Gradiente de fundo com toque de cor Apple */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>
            {/* Reflexo de luz sutil */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl transform rotate-45"></div>

            <div className={`relative z-10 ${selectedFilterType === 'Lanche da tarde' ? 'text-white' : 'text-white/80'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a10 10 0 1 0 10 10H2A10 10 0 0 0 12 2z" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-white/70 mt-2">Lanche</span>
        </button>

        {/* Janta */}
        <button
          key="janta"
          onClick={() => handleFilterClick('Janta')}
          className="group relative flex flex-col items-center"
          title="Janta"
        >
          <div className="tilt-card relative w-[80px] h-[80px] rounded-[20px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
            {/* Efeito de brilho superior premium */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            {/* Efeito de brilho lateral */}
            <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>
            {/* Gradiente de fundo com toque de cor Apple */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>
            {/* Reflexo de luz sutil */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl transform rotate-45"></div>

            <div className={`relative z-10 ${selectedFilterType === 'Janta' ? 'text-white' : 'text-white/80'}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                <path d="M7 2v20" />
                <path d="M21 15V2" />
                <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-white/70 mt-2">Janta</span>
        </button>
      </div>
    </div>
  );
}