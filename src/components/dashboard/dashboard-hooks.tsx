import { useState, useEffect } from 'react';
import { useUser } from '@stackframe/stack';

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

export function useMeals() {
  // Obter o usuário autenticado
  const user = useUser();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCalories, setTotalCalories] = useState(0);
  const [filter, setFilter] = useState<string | null>(null);
  const [currentMeal, setCurrentMeal] = useState<Meal | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState<string | null>(null);
  const [filteredMealsByType, setFilteredMealsByType] = useState<Meal[]>([]);

  // Buscar refeições ao carregar a página ou quando o usuário mudar
  useEffect(() => {
    if (user) {
      fetchMeals();
      fetchCalories();
    }
  }, [user]);

  // Inicializar filteredMeals com meals e calcular calorias
  useEffect(() => {
    setFilteredMeals(meals);
    calculateTotalCalories(meals);
  }, [meals]);

  // Buscar refeições
  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/meals');
      if (!response.ok) {
        throw new Error('Falha ao buscar refeições');
      }
      const data = await response.json();
      setMeals(data);
      applyFilter(data, filter);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setLoading(false);
    }
  };

  // Calcular calorias diretamente das refeições
  const calculateTotalCalories = (mealsArray: Meal[]) => {
    const total = mealsArray.reduce((sum, meal) => sum + meal.calories, 0);
    setTotalCalories(total);
    return total;
  };

  // Buscar calorias
  const fetchCalories = async () => {
    try {
      // Obter a data atual no formato YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];

      // Adicionar um timestamp para evitar cache
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/meals/calories?date=${today}&_=${timestamp}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar calorias');
      }

      const data = await response.json();

      // Verificar se os dados contêm totalCalories
      if (data && typeof data.totalCalories === 'number') {
        // Atualizar o estado com o valor das calorias
        setTotalCalories(data.totalCalories);
      } else {
        // Calcular calorias localmente como fallback
        calculateTotalCalories(meals);
      }
    } catch (err) {
      // Calcular calorias localmente como fallback
      calculateTotalCalories(meals);
    }
  };

  // Aplicar filtro às refeições
  const applyFilter = (mealsToFilter: Meal[], filterValue: string | null) => {
    if (!filterValue) {
      setFilteredMeals(mealsToFilter);
      return;
    }

    const filtered = mealsToFilter.filter(meal =>
      meal.type.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredMeals(filtered);
  };

  // Manipular mudança de filtro
  const handleFilterChange = (filterValue: string | null) => {
    setFilter(filterValue);
    applyFilter(meals, filterValue);
  };

  // Manipular clique em filtro
  const handleFilterClick = (filterType: string) => {
    setSelectedFilterType(filterType);

    // Filtrar refeições pelo tipo selecionado
    const filtered = meals
      .filter(meal => meal.type === filterType)
      .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());

    setFilteredMealsByType(filtered);
    setIsFilterModalOpen(true);
  };

  // Abrir modal para adicionar refeição
  const handleAddMeal = () => {
    setCurrentMeal(undefined);
    setIsModalOpen(true);
  };

  // Abrir modal para editar refeição
  const handleEditMeal = (meal: Meal) => {
    setCurrentMeal(meal);
    setIsModalOpen(true);
  };

  // Excluir refeição
  const handleDeleteMeal = async (id: string) => {
    try {
      // Verificar se o ID é válido
      if (!id || typeof id !== 'string' || id.trim() === '') {
        return;
      }

      const response = await fetch(`/api/meals/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Falha ao excluir refeição');
      }

      // Atualizar a lista de refeições
      await fetchMeals();

      // Atualizar a lista de refeições filtradas
      if (selectedFilterType) {
        const updatedFilteredMeals = meals
          .filter(meal => meal._id !== id && meal.type === selectedFilterType)
          .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime());
        setFilteredMealsByType(updatedFilteredMeals);
      }

      // Forçar atualização das calorias
      await fetchCalories();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir refeição');
    }
  };

  // Salvar refeição (criar ou atualizar)
  const handleSaveMeal = async (mealData: Omit<Meal, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (currentMeal) {
        // Atualizar refeição existente
        const response = await fetch(`/api/meals/${currentMeal._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mealData)
        });

        if (!response.ok) {
          throw new Error('Falha ao atualizar refeição');
        }
      } else {
        // Criar nova refeição
        const response = await fetch('/api/meals', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mealData)
        });

        if (!response.ok) {
          throw new Error('Falha ao criar refeição');
        }
      }

      // Fechar modal e atualizar dados
      setIsModalOpen(false);

      // Atualizar dados
      await fetchMeals();

      // Forçar atualização das calorias
      const today = new Date().toISOString().split('T')[0];

      // Adicionar um pequeno atraso para garantir que o banco de dados foi atualizado
      await new Promise(resolve => setTimeout(resolve, 500));

      const caloriesResponse = await fetch(`/api/meals/calories?date=${today}`);
      if (caloriesResponse.ok) {
        const caloriesData = await caloriesResponse.json();

        // Atualizar diretamente o estado
        setTotalCalories(caloriesData.totalCalories);
      }
    } catch (err) {
      // Tratar erro silenciosamente
    }
  };

  return {
    meals,
    filteredMeals,
    loading,
    error,
    totalCalories,
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
  };
}

export type { Meal };