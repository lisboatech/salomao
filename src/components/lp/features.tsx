'use client'

import React from 'react'

// Componente para cada card de recurso
const FeatureCard = ({
  title,
  description,
  index
}: {
  title: string;
  description: string;
  index: number;
}) => {
  return (
    <div className="relative group">
      <div className="tilt-card relative w-[320px] h-[420px] mx-7 my-8 rounded-[28px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
        {/* Atualizando os efeitos de luz e gradientes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C0A080]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#C0A080]/10 via-transparent to-[#C0A080]/5"></div>
          <div className="absolute -inset-4 bg-[#C0A080]/[0.02] blur-3xl rounded-full opacity-50"></div>
        </div>

        <div className="p-10 text-center relative z-10 flex flex-col items-center justify-center h-full">
          {/* Ícone de número com estilo Apple */}
          <div className="absolute top-8 right-8">
            <div className="relative">
              <span className="text-[3.5rem] font-extralight tracking-tight text-white/10 bg-clip-text bg-gradient-to-b from-white/20 to-white/5">{String(index).padStart(2, '0')}</span>
              <div className="absolute -inset-1 blur-md bg-[#C0A080]/10 opacity-30 rounded-full"></div>
            </div>
          </div>

          {/* Título com estilo premium */}
          <h3 className="text-2xl font-bold tracking-wide mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">{title}</h3>

          {/* Separador elegante */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#C0A080]/80 to-transparent mb-8"></div>

          {/* Descrição com máxima legibilidade */}
          <p className="text-white/95 text-base leading-relaxed font-light max-w-[85%] tracking-wide">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default function FeaturesSection() {
  const features = [
    {
      title: "Visualização 3D de Dados",
      description: "Transforme planilhas em modelos 3D interativos que revelam padrões ocultos. Segundo a IBM, a IA acelera a análise e aumenta a precisão devido ao volume de dados processados."
    },
    {
      title: "Análise Preditiva Avançada",
      description: "Algoritmos de IA analisam tendências de mercado e comportamento de clientes. Segundo a IBM, a IA preditiva analisa milhares de fatores para reduzir riscos em decisões estratégicas."
    },
    {
      title: "Assistente de Decisões",
      description: "Receba recomendações objetivas baseadas em análise de dados e casos de sucesso, eliminando viéses cognitivos e aumentando a assertividade em decisões críticas."
    },
  ]

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80 pb-1 relative inline-block">
            Experiência Imersiva
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C0A080]/70 to-transparent"></div>
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto font-light tracking-wide text-lg leading-relaxed mt-8">
            Sistema de inteligência artificial com interface 3D que transforma a maneira como empresas analisam dados e tomam decisões, aumentando a precisão e reduzindo o tempo de análise.
          </p>
        </div>

        <div className="flex flex-wrap justify-center">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              index={index + 1}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>

      {/* Fundo com efeito premium futurista - estilo Apple */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#C0A080]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#C0A080]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent blur-3xl"></div>
      </div>
    </section>
  )
}
