'use client'

import React from 'react'

type BenefitProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Benefit: React.FC<BenefitProps> = ({ icon, title, description }) => {
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
          {/* Ícone no topo */}
          <div className="w-16 h-16 flex items-center justify-center mb-6 relative">
            <div className="relative z-10 text-white text-3xl">{icon}</div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#BF5AF2]/20 to-transparent rounded-full blur-lg opacity-30"></div>
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

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>,
      title: "Fluxo Quântico",
      description: "Acesse seus dados nutricionais em tempo real através de um sistema responsivo que antecipa suas necessidades e apresenta insights precisos no momento exato."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
            </svg>,
      title: "Decisões Informadas",
      description: "Visualize seus dados nutricionais em ambientes 3D interativos que revelam padrões e tendências para decisões alimentares mais inteligentes."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>,
      title: "Motivação Contínua",
      description: "Acompanhe sua evolução através de uma cronologia alimentar imersiva que celebra suas conquistas e mantém seu foco nos objetivos."
    },

  ];

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Efeito de gradiente premium futurista - estilo Apple */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#BF5AF2]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#0A84FF]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80 pb-1 relative inline-block">
            Benefícios Práticos
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#BF5AF2]/70 to-transparent"></div>
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto font-light tracking-wide text-lg leading-relaxed mt-8">
            Jane elimina a complexidade do controle alimentar, transformando dados em insights acionáveis que impulsionam resultados reais.
          </p>
        </div>

        <div className="flex flex-wrap justify-center">
          {benefits.map((benefit, index) => (
            <Benefit
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
