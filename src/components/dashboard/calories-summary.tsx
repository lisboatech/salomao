'use client';

interface CaloriesSummaryProps {
  totalCalories: number;
  date?: string;
}

export function CaloriesSummary({ totalCalories, date }: CaloriesSummaryProps) {
  // Formatar data atual
  const formattedDate = date || new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(new Date());

  console.log('Renderizando CaloriesSummary com totalCalories:', totalCalories);

  return (
    <div className="glass p-12 rounded-xl w-full min-w-[300px] text-center">
      <h2 className="text-2xl font-semibold mb-3">Calorias</h2>
      <p className="text-sm opacity-70 mb-8">{formattedDate}</p>
      <div className="flex items-center justify-center py-4">
        <p className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          {totalCalories || 0}
        </p>
      </div>
      {/* Debug info */}
      <div className="mt-4 text-xs opacity-50">
        Valor atual: {totalCalories}
      </div>
    </div>
  );
}