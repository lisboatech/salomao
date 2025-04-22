'use client';

import { useState } from 'react';
import { SalomaoLogo } from '@/components/ui/salomao-logo';
import { VisualizationSphere } from '@/components/ui/sphere';
import { LiveKitButton } from '@/components/livekit/livekit-button';
import { BackToLandingButton } from '@/components/ui/back-to-landing-button';
import { Suspense } from 'react';
import Loader from '@/components/ui/loader';

function DashboardContent() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <main className="h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto">
        {/* Header com logo - posicionado no canto superior esquerdo */}
        <div className="absolute top-4 left-4 z-10">
          <div className="hover:opacity-80 transition-opacity duration-300">
            <SalomaoLogo />
          </div>
        </div>

        {/* Botão de voltar para a landing page - posicionado no canto superior direito */}
        <div className="absolute top-4 right-4 z-10">
          <BackToLandingButton />
        </div>

        {/* Layout premium estilo Apple: Esfera e controles */}
        <div className="flex items-center justify-center h-full w-full" style={{ marginTop: '-10%' }}>
          {/* Área central: Esfera como elemento âncora - estilo Apple */}
          <div className="relative flex items-center justify-center">
            {/* Esfera de visualização com botão de voz - posicionada mais acima */}
            <div className="relative flex items-center justify-center h-[650px] w-[650px]">
              {/* Efeito de brilho sutil em torno da esfera */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute -inset-8 bg-[#C0A080]/[0.05] blur-3xl rounded-full opacity-60"></div>
                <div className="relative">
                  <VisualizationSphere />
                </div>
              </div>
            </div>

          </div>

          {/* Botão de conexão LiveKit - posicionado abaixo da esfera com espaçamento adequado */}
          <div className="fixed bottom-[12%] left-1/2 transform -translate-x-1/2 z-20">
            <LiveKitButton
              isConnected={isConnected}
              onConnectionChange={setIsConnected}
            />
          </div>

          {/* Provérbio de Salomão - posicionado abaixo do botão */}
          <div className="fixed bottom-[5%] left-1/2 transform -translate-x-1/2 z-20">
            <div className="text-white/60 text-xs font-light tracking-wide max-w-xs text-center">
              <p>"A sabedoria é mais preciosa que rubis."<br/> - Provérbios 8:11</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        /* Media queries para responsividade */
        @media (max-width: 1024px) {
          /* Mantém o layout desktop para telas maiores que 1024px */
        }

        @media (max-width: 768px) {
          /* Ajustes para tablets */
        }

        @media (max-width: 640px) {
          /* Ajustes para dispositivos móveis */
        }
      `}</style>
    </main>
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
