// jane-front/src/components/dashboard/meal-form.tsx
'use client';

import { useState, useEffect } from 'react';

interface Meal {
  _id?: string;
  name: string;
  description?: string;
  calories: number;
  dateTime: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

interface MealFormProps {
  meal?: Meal;
  onSubmit: (meal: Omit<Meal, '_id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function MealForm({ meal, onSubmit, onCancel }: MealFormProps) {
  const [formData, setFormData] = useState<Omit<Meal, '_id' | 'createdAt' | 'updatedAt'>>({
    name: '',
    description: '',
    calories: 0,
    dateTime: new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).toISOString().slice(0, 16), // Formato YYYY-MM-DDThh:mm com fuso horário do Brasil
    type: 'Café da manhã'
  });

  // Se for edição, preencher o formulário com os dados da refeição
  useEffect(() => {
    if (meal) {
      setFormData({
        name: meal.name,
        description: meal.description || '',
        calories: meal.calories,
        dateTime: new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).toISOString().slice(0, 16),
        type: meal.type
      });
    }
  }, [meal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'calories') {
      // Remover zeros à esquerda e converter para número
      const cleanValue = value.replace(/^0+/, '');
      setFormData(prev => ({
        ...prev,
        [name]: cleanValue === '' ? 0 : parseInt(cleanValue, 10)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Garantir que a data está no formato correto para o fuso horário do Brasil
    const submissionData = {
      ...formData,
      // Usar o fuso horário do Brasil (America/Sao_Paulo)
      dateTime: new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })).toISOString()
    };

    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {/* Efeito de brilho sutil no fundo */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative">
        <label htmlFor="name" className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-light">
          Nome
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nome da refeição"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 focus:bg-white/8 transition-all duration-300 text-white placeholder:text-white/30 backdrop-blur-sm"
        />
      </div>

      <div className="relative">
        <label htmlFor="description" className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-light">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Descrição opcional"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 focus:bg-white/8 transition-all duration-300 text-white placeholder:text-white/30 backdrop-blur-sm resize-none"
        />
      </div>

      <div className="relative">
        <label htmlFor="calories" className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-light">
          Calorias
        </label>
        <div className="relative">
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            id="calories"
            name="calories"
            value={formData.calories === 0 ? '' : formData.calories}
            onChange={handleChange}
            required
            placeholder="0"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 focus:bg-white/8 transition-all duration-300 text-white placeholder:text-white/30 backdrop-blur-sm"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 text-sm">cal</div>
        </div>
      </div>

      {/* Campo de data e hora removido - preenchido automaticamente com o fuso horário do Brasil */}

      <div className="relative">
        <label htmlFor="type" className="block text-xs uppercase tracking-wider text-white/60 mb-2 font-light">
          Tipo de Refeição
        </label>
        <div className="relative">
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full appearance-none px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 focus:bg-white/8 transition-all duration-300 text-white backdrop-blur-sm [&>option]:text-black"
          >
            <option value="Café da manhã">Café da manhã</option>
            <option value="Almoço">Almoço</option>
            <option value="Lanche da tarde">Lanche da tarde</option>
            <option value="Janta">Janta</option>
          </select>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" className="text-white/40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-6 relative">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 text-white/70 hover:text-white border border-transparent hover:border-white/10 text-sm font-light tracking-wide"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 rounded-xl transition-all duration-300 text-white text-sm font-light tracking-wide border border-white/10 hover:border-white/20 shadow-[0_0_15px_rgba(120,80,220,0.1)] hover:shadow-[0_0_20px_rgba(120,80,220,0.2)]"
        >
          {meal ? 'Atualizar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}