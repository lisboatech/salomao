'use client';

import React from 'react';

// Componente para exibir informações da cronologia
const TimelineInfo = ({
  totalCalories,
  mealsCount,
  timeStats
}: {
  totalCalories: number;
  mealsCount: number;
  timeStats: {
    firstDate: Date;
    lastDate: Date;
    periodDays: number;
  } | null;
}) => {
  return (
    <div className="fixed top-6 left-6 z-50 text-white font-light text-xl tracking-wide" style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div className="flex flex-col">

        {/* Informações temporais - mesmo estilo da legenda */}
        {timeStats && (
          <div className="bg-black/30 backdrop-blur-xl p-3 rounded-xl border border-white/10 shadow-lg">
            <div className="text-xs sm:text-sm text-white/80 mb-2 font-medium">Informações Temporais</div>
            <div className="space-y-1 sm:space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#007AFF' }}></div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#007AFF" className="w-3 h-3 sm:w-4 sm:h-4">
                    <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white text-xs sm:text-xs">Primeira: {timeStats.firstDate.toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#5E5CE6' }}></div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5E5CE6" className="w-3 h-3 sm:w-4 sm:h-4">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white text-xs sm:text-xs">Última: {timeStats.lastDate.toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#AF52DE' }}></div>
                <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#AF52DE" className="w-3 h-3 sm:w-4 sm:h-4">
                    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white text-xs sm:text-xs">Período: {timeStats.periodDays} dias</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimelineInfo;
