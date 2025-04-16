import { Modal } from '@/components/ui/modal';
import { MealForm } from '@/components/dashboard/meal-form';
import { Meal } from './dashboard-hooks';

interface MealEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMeal?: Meal;
  onSubmit: (mealData: Omit<Meal, '_id' | 'createdAt' | 'updatedAt'>) => void;
}

export function MealEditModal({
  isOpen,
  onClose,
  currentMeal,
  onSubmit
}: MealEditModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={currentMeal ? 'Editar Refeição' : 'Nova Refeição'}
    >
      <MealForm
        meal={currentMeal}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
} 