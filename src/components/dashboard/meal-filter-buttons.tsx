import { Meal } from './dashboard-hooks';
import { AppIcon } from '@/components/ui/app-icon';

interface MealFilterButtonsProps {
  selectedFilterType: string | null;
  handleFilterClick: (filterType: string) => void;
}

export function MealFilterButtons({ selectedFilterType, handleFilterClick }: MealFilterButtonsProps) {
  return (
    <div className="mt-0 w-full flex justify-center">
      <div className="grid grid-cols-4 gap-2 xs:gap-4 sm:gap-6 md:gap-10 lg:gap-12 justify-items-center">
        {/* Café da manhã */}
        <AppIcon
          label="Café"
          onClick={() => handleFilterClick('Café da manhã')}
        >
          <div className={`${selectedFilterType === 'Café da manhã' ? 'text-white' : 'text-white/80'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
            </svg>
          </div>
        </AppIcon>

        {/* Almoço */}
        <AppIcon
          label="Almoço"
          onClick={() => handleFilterClick('Almoço')}
        >
          <div className={`${selectedFilterType === 'Almoço' ? 'text-white' : 'text-white/80'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2" />
              <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
          </div>
        </AppIcon>

        {/* Lanche da tarde */}
        <AppIcon
          label="Lanche"
          onClick={() => handleFilterClick('Lanche da tarde')}
        >
          <div className={`${selectedFilterType === 'Lanche da tarde' ? 'text-white' : 'text-white/80'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10H2A10 10 0 0 0 12 2z" />
            </svg>
          </div>
        </AppIcon>

        {/* Janta */}
        <AppIcon
          label="Janta"
          onClick={() => handleFilterClick('Janta')}
        >
          <div className={`${selectedFilterType === 'Janta' ? 'text-white' : 'text-white/80'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
              <path d="M7 2v20" />
              <path d="M21 15V2" />
              <path d="M18 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
            </svg>
          </div>
        </AppIcon>
      </div>
    </div>
  );
}