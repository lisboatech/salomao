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
      {/* Card com efeito premium ultra-futurista estilo Apple */}
      <div className="tilt-card relative w-[320px] h-[420px] mx-7 my-8 rounded-[28px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
        {/* Efeito de brilho superior premium */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

        {/* Efeito de brilho lateral */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>

        {/* Gradiente de fundo com toque de cor Apple */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>

        {/* Reflexo de luz sutil */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl transform rotate-45"></div>

        <div className="p-10 text-center relative z-10 flex flex-col items-center justify-center h-full">
          {/* Ícone de número com estilo Apple */}
          <div className="absolute top-8 right-8">
            <div className="relative">
              <span className="text-[3.5rem] font-extralight tracking-tight text-white/10 bg-clip-text bg-gradient-to-b from-white/20 to-white/5">{String(index).padStart(2, '0')}</span>
              <div className="absolute -inset-1 blur-md bg-[#BF5AF2]/10 opacity-30 rounded-full"></div>
            </div>
          </div>

          {/* Título com estilo premium */}
          <h3 className="text-2xl font-bold tracking-wide mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">{title}</h3>

          {/* Separador elegante */}
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#BF5AF2]/80 to-transparent mb-8"></div>

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
      title: "Experiência Revolucionária",
      description: "Navegue em um ecossistema digital de vanguarda onde seus dados nutricionais ganham vida através de uma interface dimensional que transcende o convencional."
    },
    {
      title: "Visualização 3D Imersiva",
      description: "Explore suas estatísticas alimentares em ambientes tridimensionais interativos que revelam padrões ocultos em seus hábitos."
    },
    {
      title: "Cronologia Alimentar",
      description: "Viaje no tempo através de sua história alimentar com uma interface futurista que permite analisar sua evolução nutricional."
    },
  ]

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80 pb-1 relative inline-block">
            Recursos Principais
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#BF5AF2]/70 to-transparent"></div>
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto font-light tracking-wide text-lg leading-relaxed mt-8">
            Jane reimagina a gestão alimentar com tecnologia de ponta que transforma dados em experiências visuais extraordinárias.
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
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#BF5AF2]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#0A84FF]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent blur-3xl"></div>
      </div>
    </section>
  )
}
