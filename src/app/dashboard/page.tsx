'use client';

import { useMeals } from '@/components/dashboard/dashboard-hooks';
import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { MealFilterButtons } from '@/components/dashboard/meal-filter-buttons';
import { MealEditModal } from '@/components/dashboard/meal-edit-modal';
import { FilterModal } from '@/components/dashboard/filter-modal';
import { useUser } from '@stackframe/stack';
import { Suspense, useEffect, useState } from 'react';
import Loader from '@/components/ui/loader';
import { useRouter } from 'next/navigation';
import { ClientProvider } from '@/components/auth/client-provider';

// Componente interno que usa useUser
function DashboardInner() {
  const router = useRouter();
  const user = useUser({ or: 'return' });

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (user === null) {
      router.push('/sign-in');
    }
  }, [user, router]);

  // Se não houver usuário, mostrar loader
  if (user === null) {
    return <Loader message="Verificando autenticação..." />;
  }

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

// Componente que usa ClientProvider
function DashboardContent() {
  return (
    <ClientProvider>
      <DashboardInner />
    </ClientProvider>
  );
}

// Componente principal com Suspense boundary
export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader message="Carregando dashboard..." />;
  }

  return (
    <Suspense fallback={<Loader message="Carregando dashboard..." />}>
      <DashboardContent />
    </Suspense>
  );
}