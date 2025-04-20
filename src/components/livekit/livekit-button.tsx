'use client';

import { useState, useEffect } from 'react';
import { Room, RoomEvent } from 'livekit-client';
import { useVoiceAssistant, RoomAudioRenderer, BarVisualizer, RoomContext } from '@livekit/components-react';
import type { ConnectionDetails } from '@/app/api/salomao-connection/route';

interface LiveKitButtonProps {
  isConnected: boolean;
  onConnectionChange: (connected: boolean) => void;
}

export function LiveKitButton({ isConnected, onConnectionChange }: LiveKitButtonProps) {
  const [room] = useState(new Room());
  const [isConnecting, setIsConnecting] = useState(false);

  // Conectar ao LiveKit
  const connectToLiveKit = async () => {
    try {
      setIsConnecting(true);

      // Obter detalhes da conexão da API
      const url = new URL('/api/salomao-connection', window.location.origin);
      const response = await fetch(url.toString());
      const connectionDetailsData: ConnectionDetails = await response.json();

      // Conectar à sala
      await room.connect(connectionDetailsData.serverUrl, connectionDetailsData.participantToken);
      await room.localParticipant.setMicrophoneEnabled(true);

      onConnectionChange(true);
      setIsConnecting(false);
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setIsConnecting(false);
    }
  };

  // Desconectar do LiveKit
  const disconnectFromLiveKit = () => {
    room.disconnect();
    onConnectionChange(false);
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

  // Componente para a visualização de áudio
  const VoiceAssistantWrapper = () => {
    const { state: agentState, audioTrack } = useVoiceAssistant();

    return (
      <>
        {/* Visualizador de áudio */}
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

        {/* Renderizador de áudio (invisível) */}
        <RoomAudioRenderer />
      </>
    );
  };

  return (
    <>
      {/* Botão de ativação de voz */}
      <button
        onClick={isConnected ? disconnectFromLiveKit : connectToLiveKit}
        disabled={isConnecting}
        className={`px-12 h-14 w-48 rounded-full flex items-center justify-center transition-all duration-300 ${
          isConnected
            ? 'bg-white/15 border border-[#C0A080]/40 shadow-[0_0_25px_rgba(192,160,128,0.25)]'
            : 'bg-[#F5F5F7] text-black hover:bg-white/90 hover:shadow-[0_0_25px_rgba(192,160,128,0.6)] shadow-[0_0_15px_rgba(192,160,128,0.3)]'
        } backdrop-blur-xl`}
        aria-label={isConnected ? 'Desativar assistente de voz' : 'Ativar assistente de voz'}
      >
        <span className={`text-base font-medium tracking-wide uppercase ${isConnected ? 'text-white' : 'text-black'}`}>
          {isConnected ? 'Desconectar' : 'Conectar'}
        </span>
      </button>

      {/* Indicador de status */}
      {isConnecting && (
        <div className="mt-4 text-sm text-white/70">
          Conectando...
        </div>
      )}

      {/* Componente LiveKit com RoomContext - apenas para renderizar o áudio */}
      <RoomContext.Provider value={room}>
        <div className="hidden">
          <VoiceAssistantWrapper />
        </div>
      </RoomContext.Provider>
    </>
  );
}
