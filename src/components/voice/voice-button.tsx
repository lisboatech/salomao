'use client';

import { useState, useEffect } from 'react';
// import { Room, RoomEvent } from 'livekit-client';
// import { useVoiceAssistant, RoomAudioRenderer, BarVisualizer, RoomContext } from '@livekit/components-react';
// import type { ConnectionDetails } from '@/app/api/connection-details/route';
import { VoiceSphere } from './voice-sphere';

export function VoiceButton() {
  // const [room] = useState(new Room());
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Componente para a esfera com efeitos de voz
  /*
  const VoiceAssistantWrapper = ({ isConnected }: { isConnected: boolean }) => {
    const { state: agentState, audioTrack } = useVoiceAssistant();

    return (
      <>
        <VoiceSphere isConnected={isConnected} agentState={agentState} />

        {/* Visualizador de áudio *//*}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-10">
          {isConnected && agentState !== 'disconnected' && agentState !== 'connecting' && (
            <div>
              <BarVisualizer
                state={agentState}
                barCount={5}
                trackRef={audioTrack}
                className="w-16 gap-1"
                options={{ minHeight: 3, maxHeight: 12 }}
              />
            </div>
          )}
        </div>

        {/* Renderizador de áudio (invisível) *//*}
        <RoomAudioRenderer />
      </>
    );
  };*/

  // Conectar ao LiveKit
  /*
  const connectToLiveKit = async () => {
    try {
      setIsConnecting(true);

      // Obter detalhes da conexão da API
      const url = new URL('/api/connection-details', window.location.origin);
      const response = await fetch(url.toString());
      const connectionDetailsData: ConnectionDetails = await response.json();

      // Conectar à sala
      await room.connect(connectionDetailsData.serverUrl, connectionDetailsData.participantToken);
      await room.localParticipant.setMicrophoneEnabled(true);

      setIsConnected(true);
      setIsConnecting(false);
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setIsConnecting(false);
    }
  };

  // Desconectar do LiveKit
  const disconnectFromLiveKit = () => {
    room.disconnect();
    setIsConnected(false);
  };

  // Lidar com erros de dispositivos de mídia
  useEffect(() => {
    const handleDeviceFailure = (error: Error) => {
      console.error('Erro de dispositivo de mídia:', error);
      setIsConnecting(false);
    };

    room.on(RoomEvent.MediaDevicesError, handleDeviceFailure);

    return () => {
      room.off(RoomEvent.MediaDevicesError, handleDeviceFailure);
    };
  }, [room]);
  */

  // Renderizar o botão de voz
  return (
    <div className="flex flex-col items-center justify-center relative">
      {/* Esfera de visualização com efeitos de voz - posicionada para alinhar com os ícones */}
      <div className="flex items-center justify-center">
        <VoiceSphere isConnected={false} agentState="disconnected" />
      </div>

      {/* Botão de ativação de voz - posicionado abaixo da esfera */}
      {/*
      <button
        onClick={isConnected ? disconnectFromLiveKit : connectToLiveKit}
        disabled={isConnecting}
        className={`absolute left-1/2 transform -translate-x-1/2 top-[450px] px-12 h-14 w-48 md:w-56 rounded-full flex items-center justify-center transition-all duration-300 ${
          isConnected
            ? 'bg-white/15 border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.25)]'
            : 'bg-white text-black hover:bg-white/90 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]'
        } backdrop-blur-xl`}
        aria-label={isConnected ? 'Desativar assistente de voz' : 'Ativar assistente de voz'}
      >
        <span className={`text-sm font-medium tracking-wide uppercase ${isConnected ? 'text-white' : 'text-black'}`}>
          {isConnected ? 'Parar' : 'Jane'}
        </span>
      </button>
      */}

      {/* Indicador de status */}
      {/*isConnected && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-[530px] text-[10px] uppercase tracking-wider text-white/70 font-light">
          {isConnecting && 'Conectando...'}
          {!isConnecting && 'Assistente ativo'}
        </div>
      )*/}

      {/* Componente LiveKit com RoomContext - apenas para renderizar o áudio */}
      {/*
      <RoomContext.Provider value={room}>
        <div className="hidden">
          <RoomAudioRenderer />
        </div>
      </RoomContext.Provider>
      */}
    </div>
  );
}
