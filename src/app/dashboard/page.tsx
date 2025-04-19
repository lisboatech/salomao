'use client';

import { useMeals } from '@/components/dashboard/dashboard-hooks';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { MealFilterButtons } from '@/components/dashboard/meal-filter-buttons';
import { MealEditModal } from '@/components/dashboard/meal-edit-modal';
import { FilterModal } from '@/components/dashboard/filter-modal';
import { Suspense } from 'react';
import Loader from '@/components/ui/loader';

function DashboardContent() {
  const {
    filteredMeals,
    loading,
    error,
    filter,
    currentMeal,
    isModalOpen,
    isFilterModalOpen,
    selectedFilterType,
    filteredMealsByType,
    handleFilterChange,
    handleFilterClick,
    handleAddMeal,
    handleEditMeal,
    handleDeleteMeal,
    handleSaveMeal,
    setIsModalOpen,
    setIsFilterModalOpen
  } = useMeals();

  return (
    <DashboardLayout
      filteredMeals={filteredMeals}
      loading={loading}
      error={error}
      currentFilter={filter}
      onAddClick={handleAddMeal}
      onEditMeal={handleEditMeal}
      onDeleteMeal={handleDeleteMeal}
      onFilterChange={handleFilterChange}
    >
      <MealFilterButtons
        selectedFilterType={selectedFilterType}
        handleFilterClick={handleFilterClick}
      />

      {/* Modal para adicionar/editar refeição */}
      <MealEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentMeal={currentMeal}
        onSubmit={handleSaveMeal}
      />

      {/* Modal para exibir refeições filtradas */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        title={selectedFilterType ? `Refeições: ${selectedFilterType}` : 'Refeições'}
        loading={loading}
        error={error}
        meals={filteredMealsByType}
        onEdit={handleEditMeal}
        onDelete={handleDeleteMeal}
      />
    </DashboardLayout>
  );
}

// Componente principal com Suspense boundary
export default function DashboardPage() {
  return (
    <Suspense fallback={<Loader message="Carregando dashboard..." />}>
      <DashboardContent />
    </Suspense>
  );
}