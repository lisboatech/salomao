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
        {/* Atualizando os efeitos de luz */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#C0A080]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#C0A080]/10 via-transparent to-[#C0A080]/5"></div>
          <div className="absolute -inset-4 bg-[#C0A080]/[0.02] blur-3xl rounded-full opacity-50"></div>
        </div>

        <div className="p-10 text-center relative z-10 flex flex-col items-center justify-center h-full">
          {/* Ícone no topo */}
          <div className="w-16 h-16 flex items-center justify-center mb-6 relative">
            <div className="relative z-10 text-white text-3xl">{icon}</div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#C0A080]/20 to-transparent rounded-full blur-lg opacity-30"></div>
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

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>,
      title: "Redução de Erros de Decisão",
      description: "Elimine viéses cognitivos e decisões baseadas em intuição. Algoritmos de IA podem identificar padrões em grandes volumes de dados que seriam difíceis de detectar manualmente."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>,
      title: "Melhoria em Conversão",
      description: "Identifique oportunidades de mercado com análise de dados. Sistemas de IA ajudam a otimizar estratégias de marketing e vendas com base em insights de dados reais."
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
            </svg>,
      title: "ROI Significativo",
      description: "Segundo a PwC, empresas que implementam IA reduzem custos operacionais em até 30%, com retorno sobre investimento significativo em processos decisórios."
    },
  ];

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#C0A080]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-transparent via-[#C0A080]/3 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-extralight tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/80 pb-1 relative inline-block">
            Resultados Comprovados
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-[#C0A080]/70 to-transparent"></div>
          </h2>
          <p className="text-white/95 max-w-2xl mx-auto font-light tracking-wide text-lg leading-relaxed mt-8">
            Segundo a Gartner, empresas que adotam IA reduzem custos operacionais em até 30%, com melhorias significativas em métricas-chave de negócios.
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
