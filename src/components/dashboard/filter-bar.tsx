'use client';

interface FilterBarProps {
  onFilterChange: (filter: string | null) => void;
  currentFilter: string | null;
}

export function FilterBar({ onFilterChange, currentFilter }: FilterBarProps) {
  const mealTypes = [
    { id: 'cafe', label: 'Café da manhã' },
    { id: 'almoco', label: 'Almoço' },
    { id: 'lanche', label: 'Lanche da tarde' },
    { id: 'janta', label: 'Janta' }
  ];

  return (
    <div className="w-full">
      <div className="relative flex flex-wrap gap-3 justify-start bg-white/5 backdrop-blur-xl p-1.5 rounded-full max-w-fit mx-auto border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)]">
        <button
          onClick={() => onFilterChange(null)}
          className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
            currentFilter === null
              ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40 text-white shadow-[0_0_12px_rgba(191,90,242,0.25)]'
              : 'text-white/60 hover:text-white/90'
          }`}
        >
          Todos
        </button>

        {mealTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onFilterChange(type.label)}
            className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
              currentFilter === type.label
                ? 'bg-gradient-to-r from-purple-500/40 to-blue-500/40 text-white shadow-[0_0_12px_rgba(191,90,242,0.25)]'
                : 'text-white/60 hover:text-white/90'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}