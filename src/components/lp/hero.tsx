'use client'

import React from 'react'
import { VisualizationSphere } from '@/components/ui/sphere'
import { ExploreButton } from '@/components/lp/explore-button'

export default function HeroSection() {
  return (
    <div className="container relative min-h-screen pt-28">
      {/* Imagem de gradiente e efeito de blur */}
      <img className="absolute top-0 right-0 opacity-50 -z-10" src="/gradient.png" alt="gradient" />
      <div className="absolute top-[20%] right-0 h-0 w-[30rem] shadow-[0_0_700px_15px_white] -rotate-[30deg] -z-10"></div>

      <main className="relative z-10">
        <div className="content max-w-lg ml-[10%] mt-[28%] md:mt-[18%] lg:mt-[13%] z-10">
          {/* Tag */}
          <div className="tag-box w-[14rem] mb-5">
            <div className="tag">
              GESTÃO 4.0 &gt;
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight mb-5 uppercase bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Inteligência<br/> Empresarial
          </h1>

          {/* Descrição */}
          <p className="description text-base font-light tracking-wide text-white/70 mb-7 max-w-sm leading-relaxed">
            Assistente IA com interface 3D imersiva que analisa dados empresariais, identifica oportunidades e fornece insights estratégicos para decisões mais precisas.
          </p>

          {/* Botão */}
          <div className="buttons">
            <ExploreButton />
          </div>
        </div>
      </main>

      {/* Esfera interativa*/}
      <div className="sphere-3d absolute top-[120px] right-[5%] md:right-[10%] lg:right-[15%] w-full h-screen pointer-events-none">
        <div className="relative h-full w-full flex items-center justify-center mt-0">
          <div className="relative scale-125">
            {/* Efeito de brilho em torno da esfera - atualizado para dourado elegante */}
            <div className="absolute -inset-4 bg-[#C0A080]/[0.03] blur-3xl rounded-full opacity-50"></div>
            <VisualizationSphere />
          </div>
        </div>
      </div>
    </div>
  )
}
