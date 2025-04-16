'use client';

import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { BackButton } from '@/components/ui/back-button';
import { ShareButton } from '@/components/ui/share-button';

// Componentes separados
import Bar from './components/Bar';
import ShareToast from './components/ShareToast';
import StatsInfo from './components/StatsInfo';
import MealTypeLegend from './components/MealTypeLegend';
import SharedViewLink from './components/SharedViewLink';



// Componente principal para a visualização de estatísticas
const ThreeStatsView = ({ meals, isSharedView = false }: { meals: any[], isSharedView?: boolean }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  // Estado para controlar a visibilidade do toast de compartilhamento
  const [showShareToast, setShowShareToast] = useState(false);

  // Função para compartilhar as estatísticas como link
  const handleShare = () => {
    // Criar um objeto com os dados das refeições para compartilhar
    const shareData = {
      totalCalories: calculatedTotalCalories,
      mealStats: calculatedCaloriesByType
    };

    // Converter para string e codificar para URL
    const shareString = encodeURIComponent(JSON.stringify(shareData));

    // Criar URL com os dados
    const shareUrl = `${window.location.origin}/share-stats?data=${shareString}`;

    // Copiar para a área de transferência
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        // Mostrar toast em vez de alerta
        setShowShareToast(true);
        // Esconder o toast após 3 segundos
        setTimeout(() => setShowShareToast(false), 3000);
      })
      .catch(err => {
        console.error('Erro ao copiar link:', err);
        // Mostrar toast de erro
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      });
  };

  // Cores para os diferentes tipos de refeição no estilo Apple - igual ao aframe-stats-view
  const colors = {
    'Café da manhã': '#5E5CE6', // Roxo Apple
    'Almoço': '#007AFF',        // Azul Apple
    'Lanche da tarde': '#32ADE6', // Azul claro Apple
    'Janta': '#AF52DE'          // Roxo vibrante Apple
  };

  // Gradientes para efeito Apple - igual ao aframe-stats-view
  const gradients = {
    'Café da manhã': {top: '#7D7AFF', bottom: '#5E5CE6'},
    'Almoço': {top: '#56A0FF', bottom: '#007AFF'},
    'Lanche da tarde': {top: '#64D2FF', bottom: '#32ADE6'},
    'Janta': {top: '#D783FF', bottom: '#AF52DE'}
  };

  // Usar useMemo para evitar renderizações infinitas
  const { calculatedCaloriesByType, calculatedTypes, calculatedMaxCalories, calculatedTotalCalories } = useMemo(() => {
    const newCaloriesByType: Record<string, number> = {};

    // Inicializar todos os tipos com 0
    Object.keys(colors).forEach(type => {
      newCaloriesByType[type] = 0;
    });

    // Somar calorias por tipo
    meals.forEach((meal: any) => {
      if (newCaloriesByType[meal.type] !== undefined) {
        newCaloriesByType[meal.type] += meal.calories;
      }
    });

    // Calcular total
    const total = Object.values(newCaloriesByType).reduce((sum, cal) => sum + cal, 0);

    // Calcular valores derivados
    return {
      calculatedCaloriesByType: newCaloriesByType,
      calculatedTypes: Object.keys(newCaloriesByType),
      calculatedMaxCalories: Math.max(...Object.values(newCaloriesByType).map(val => val as number), 1),
      calculatedTotalCalories: total
    };
  }, [meals, colors]);

  return (
    <div className="w-full h-screen bg-black relative">
      {/* Toast de compartilhamento */}
      <ShareToast show={showShareToast} />

      {/* Informações de calorias totais */}
      <StatsInfo totalCalories={calculatedTotalCalories} />

      {/* Título de estatísticas compartilhadas - apenas na visualização compartilhada */}
      {isSharedView && (
        <div className="fixed top-6 right-6 z-50 text-white font-light text-sm tracking-wide hidden sm:block" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          <span className="text-white/60 uppercase tracking-widest">ESTATÍSTICAS COMPARTILHADAS</span>
        </div>
      )}

      {/* Botões de ação - só mostrar se não for uma visualização compartilhada */}
      {!isSharedView && (
        <div className="fixed top-6 right-6 z-50 flex space-x-3">
          {/* Botão de compartilhar */}
          <ShareButton onClick={handleShare} label="Compartilhar" />

          {/* Botão de voltar */}
          <div onClick={handleGoBack}>
            <BackButton href="#" label="Voltar" />
          </div>
        </div>
      )}

      {/* Link de marketing para página de vendas - apenas na visualização compartilhada */}
      {isSharedView && <SharedViewLink />}

      {/* Legenda discreta com cores e ícones */}
      <MealTypeLegend />

      {/* Cena 3D */}
      <Canvas
        camera={{ position: [0, 7, 15], fov: 50 }}
        style={{ background: 'black' }}
        gl={{ antialias: true }}
        dpr={[1, 2]}
      >
        {/* Luzes */}
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={1.5} />

        {/* Controles de órbita */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          target={[0, 2, 0]}
        />

        {/* Grade de referência */}
        <gridHelper args={[20, 20, '#333333', '#222222']} position={[0, -0.01, 0]} />

        {/* Barras para cada tipo de refeição */}
        {calculatedTypes.map((type, index) => {
          const calories = calculatedCaloriesByType[type];
          const height = (calories / calculatedMaxCalories) * 5; // Altura máxima de 5 unidades
          const xPos = (index - (calculatedTypes.length - 1) / 2) * 3; // Espaçamento de 3 unidades

          return (
            <Bar
              key={type}
              position={[xPos, 0, 0]}
              height={height > 0 ? height : 0.1} // Altura mínima para visualização
              color={colors[type as keyof typeof colors] || '#FFFFFF'}
              mealType={type}
              calories={calories}
              index={index}
              gradients={gradients}
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default ThreeStatsView;
