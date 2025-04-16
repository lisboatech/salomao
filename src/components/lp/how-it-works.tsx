'use client'

import React from 'react'

// Componente para cada etapa
const Step = ({
  number,
  title,
  description
}: {
  number: number;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start gap-10 group">
      {/* Número da etapa com efeito premium futurista */}
      <div className="relative flex-shrink-0">
        <div className="w-16 h-16 rounded-full border-t border-l border-white/30 flex items-center justify-center text-xl font-light relative z-10 backdrop-blur-xl bg-gradient-to-b from-white/15 to-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-500">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80 text-2xl">{number}</span>
        </div>
        <div className="absolute -inset-3 bg-gradient-to-r from-transparent via-[#BF5AF2]/10 to-transparent rounded-full blur-xl opacity-70"></div>

      </div>

      {/* Conteúdo da etapa com design premium */}
      <div className="pt-2">
        <h3 className="text-2xl font-light tracking-wide mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90 relative inline-block">
          {title}
          <div className="absolute -bottom-2 left-0 w-16 h-[2px] bg-gradient-to-r from-[#BF5AF2]/80 to-transparent"></div>
        </h3>
        <p className="text-white/90 text-base leading-relaxed font-light tracking-wide max-w-md">{description}</p>
      </div>
    </div>
  )
}

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Sincronize com Jane",
      description: "Conecte-se a um sistema neural avançado que interpreta seus padrões alimentares e os transforma em uma sinfonia de dados quantificáveis e acionáveis."
    },
    {
      title: "Explore em 3D",
      description: "Mergulhe em visualizações tridimensionais interativas que transformam seus dados nutricionais em experiências imersivas."
    },
    {
      title: "Viaje no Tempo",
      description: "Navegue pela sua cronologia alimentar em um túnel temporal 3D que revela padrões e celebra marcos nutricionais."
    },
    {
      title: "Compartilhe Insights",
      description: "Exporte e compartilhe suas visualizações 3D e cronologias com nutricionistas ou amigos com apenas um clique."
    }
  ]

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80 pb-1 relative inline-block">
              Experiência Futurista
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#BF5AF2]/70 to-transparent"></div>
            </h2>
            <p className="text-white/95 max-w-2xl mx-auto font-light tracking-wide text-lg leading-relaxed mt-8">
              Jane transcende o simples registro de refeições, oferecendo uma jornada sensorial através de seus dados nutricionais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            {steps.map((step, index) => (
              <Step
                key={index}
                number={index + 1}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>

          {/* Elemento central com estilo igual aos cards de features */}
          <div className="relative mt-32 mx-auto">
            <div className="relative group">
              <div className="relative w-[320px] h-[420px] mx-auto rounded-[28px] overflow-hidden flex justify-center items-center backdrop-blur-[35px] bg-gradient-to-b from-white/15 to-transparent border-t border-l border-white/20 group-hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] group-hover:glow transition-all duration-700 ease-in-out">
                {/* Efeito de brilho superior premium */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

                {/* Efeito de brilho lateral */}
                <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-white/60 via-white/20 to-transparent"></div>

                {/* Gradiente de fundo com toque de cor Apple */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#BF5AF2]/10 via-transparent to-[#0A84FF]/5"></div>

                {/* Reflexo de luz sutil */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-xl transform rotate-45"></div>

                <div className="p-10 text-center relative z-10 flex flex-col items-center justify-center h-full">
                  <p className="text-2xl font-bold tracking-wide mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/90">Experimente o Futuro Hoje</p>

                  {/* Separador elegante */}
                  <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#BF5AF2]/80 to-transparent mb-8"></div>

                  <p className="text-white/95 text-base leading-relaxed font-light max-w-[85%] tracking-wide mb-10">
                    Mergulhe em um universo de dados nutricionais onde a tecnologia de ponta encontra a ciência alimentar.
                  </p>

                  <button className="bg-gradient-to-b from-white to-gray-100 text-black px-8 py-3 rounded-full text-base font-medium tracking-wider hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-500 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                    Começar Gratuitamente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efeito de gradiente premium futurista - estilo Apple */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#BF5AF2]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#0A84FF]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
    </section>
  )
}
