import { Modal } from '@/components/ui/modal';
import { MealCard } from '@/components/dashboard/meal-card';
import { Meal } from './dashboard-hooks';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  loading: boolean;
  error: string | null;
  meals: Meal[];
  onEdit: (meal: Meal) => void;
  onDelete: (id: string) => void;
}

export function FilterModal({
  isOpen,
  onClose,
  title,
  loading,
  error,
  meals,
  onEdit,
  onDelete
}: FilterModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      className="w-full max-w-6xl h-[80vh] flex flex-col"
    >
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-6">
              <div className="w-16 h-16 border-t-2 border-b-2 border-purple-500/50 rounded-full animate-spin mb-4"></div>
              <p className="text-white/80 text-lg font-light tracking-wide">Carregando refeições<span className="animate-pulse">...</span></p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-6">
              <p className="text-red-400/80 text-lg font-light tracking-wide">{error}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            {meals.map((meal) => (
              <MealCard
                key={meal._id}
                meal={meal}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}

        {!loading && !error && meals.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center py-10">
              <div className="w-20 h-20 mx-auto mb-6 opacity-30">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="text-white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>
              <p className="text-white/80 text-lg font-light tracking-wide mb-2">Nenhuma refeição encontrada para {title.replace('Refeições: ', '')}</p>
              <p className="text-white/50 text-sm">Selecione outro tipo de refeição ou feche este modal</p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
} 