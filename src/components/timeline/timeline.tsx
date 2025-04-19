'use client';

import React, { useState, useMemo, Component, ErrorInfo, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';
import { BackButton } from '@/components/ui/back-button';
import { ShareButton } from '@/components/ui/share-button';

// Componente ErrorBoundary para capturar erros na renderização
class ErrorBoundary extends Component<{ children: ReactNode, fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode, fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erro na renderização 3D:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// Componentes separados
import TimeEvent from './components/TimeEvent';
import TimePath from './components/TimePath';
import EventDetails from './components/EventDetails';
import TimelineInfo from './components/TimelineInfo';
import MealTypeLegend from './components/MealTypeLegend';
import ShareToast from './components/ShareToast';



// Componente principal para a visualização da cronologia
const TimelineFuturistic = ({ meals = [], isSharedView = false }) => {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  // Estado para controlar a visibilidade do toast de compartilhamento
  const [showShareToast, setShowShareToast] = useState(false);

  // Função para compartilhar a cronologia como link
  const handleShare = () => {
    // Criar um objeto com os dados das refeições para compartilhar
    const shareData = {
      totalCalories: calculatedTotalCalories,
      mealStats: calculatedCaloriesByType,
      totalMeals: meals.length
    };

    // Converter para string e codificar para URL
    const shareString = encodeURIComponent(JSON.stringify(shareData));

    // Criar URL com os dados
    const shareUrl = `${window.location.origin}/share-timeline?data=${shareString}`;

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
  const { calculatedCaloriesByType, calculatedTotalCalories } = useMemo(() => {
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
      calculatedTotalCalories: total
    };
  }, [meals, colors]);

  // Ordenar refeições por data
  const sortedMeals = useMemo(() => {
    return [...meals].sort((a: any, b: any) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  }, [meals]);

  // Calcular estatísticas temporais
  const timeStats = useMemo(() => {
    if (meals.length === 0) return null;

    const dates = meals.map((m: any) => new Date(m.dateTime).getTime());
    const firstDate = new Date(Math.min(...dates));
    const lastDate = new Date(Math.max(...dates));
    const periodDays = Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24));

    return {
      firstDate,
      lastDate,
      periodDays
    };
  }, [meals]);


  return (
    <div className="w-full h-screen bg-black relative">
      {/* Toast de compartilhamento */}
      <ShareToast show={showShareToast} />

      {/* Informações da cronologia */}
      <TimelineInfo
        totalCalories={calculatedTotalCalories}
        mealsCount={meals.length}
        timeStats={timeStats}
      />

      {/* Título de cronologia compartilhada - apenas na visualização compartilhada */}
      {isSharedView && (
        <div className="fixed top-6 right-6 z-50 text-white font-light text-sm tracking-wide hidden sm:block" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
          <span className="text-white/60 uppercase tracking-widest">CRONOLOGIA COMPARTILHADA</span>
        </div>
      )}

      {/* Botões de ação - só mostrar se não for uma visualização compartilhada */}
      {!isSharedView && (
        <div className="fixed top-6 right-6 z-50 flex space-x-3">
          {/* Botão de compartilhar cronologia */}
          <ShareButton onClick={handleShare} label="Compartilhar Cronologia" />

          {/* Botão de voltar */}
          <div onClick={handleGoBack}>
            <BackButton href="#" label="Voltar" />
          </div>
        </div>
      )}

      {/* Link de marketing para página de vendas - apenas na visualização compartilhada */}
      {isSharedView && (
        <a
          href="/"
          target="_blank"
          className="fixed bottom-6 right-6 z-50 text-white/70 hover:text-white text-xs sm:text-sm font-light transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center bg-black/20 hover:bg-black/30 active:bg-black/40 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:shadow-xl cursor-pointer"
        >
          <span className="mr-1">Gerada com</span>
          <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">Jane</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      )}

      {/* Legenda de tipos de refeição */}
      <MealTypeLegend colors={colors} />

      {/* Cena 3D */}
      <ErrorBoundary fallback={<div className="w-full h-full flex items-center justify-center text-white">Erro ao renderizar visualização 3D</div>}>
        <Canvas
          camera={{ position: [0, 5, 15], fov: 60 }}
          style={{ background: 'black' }}
          gl={{ antialias: true }}
          dpr={[1, 2]}
        >
        {/* Ambiente - comentado para evitar problemas */}
        {/* <Environment preset="night" /> */}

        {/* Luzes */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={0.5} />

        {/* Controles de órbita */}
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          target={[0, 0, 0]}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 6}
        />

        {/* Caminho temporal futurista */}
        <TimePath />

        {/* Eventos na linha do tempo */}
        {sortedMeals.map((meal: any, index: number) => {
          // Posicionar eventos ao longo do caminho temporal
          const xPos = index * 4 - (sortedMeals.length - 1) * 2;

          return (
            <TimeEvent
              key={`meal-${index}`}
              position={[xPos, 1, 0]}
              color={colors[meal.type] || '#FFFFFF'}
              mealType={meal.type}
              calories={meal.calories}
              date={meal.dateTime}
              index={index}
              onClick={() => setSelectedEvent(index === selectedEvent ? null : index)}
            />
          );
        })}

        {/* Detalhes do evento selecionado */}
        {selectedEvent !== null && sortedMeals[selectedEvent] && (
          <EventDetails
            meal={sortedMeals[selectedEvent]}
            color={colors[(sortedMeals[selectedEvent] as any).type] || '#FFFFFF'}
          />
        )}
      </Canvas>
      </ErrorBoundary>
    </div>
  );
};

export default TimelineFuturistic;
