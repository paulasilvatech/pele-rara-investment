import React from 'react';

export function HeroSection() {
  const scrollToInvestment = () => {
    document.getElementById('investment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <div className="logo">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 40 C70 40, 40 70, 40 100 C40 130, 70 160, 100 160" stroke="#fff" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M100 50 C75 50, 50 75, 50 100 C50 125, 75 150, 100 150" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6"/>
            <path d="M100 60 C80 60, 60 80, 60 100 C60 120, 80 140, 100 140" stroke="#fff" strokeWidth="1" fill="none" opacity="0.7"/>
            <path d="M100 40 C130 40, 160 70, 160 100 C160 130, 130 160, 100 160" stroke="#fff" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M100 50 C125 50, 150 75, 150 100 C150 125, 125 150, 100 150" stroke="#fff" strokeWidth="1" fill="none" opacity="0.6"/>
            <path d="M100 60 C120 60, 140 80, 140 100 C140 120, 120 140, 100 140" stroke="#fff" strokeWidth="1" fill="none" opacity="0.7"/>
          </svg>
        </div>
        <h1>Tecnologia <strong>Patenteada</strong><br/>Transformando o Cuidado<br/>com Pele Sensível</h1>
        <p className="hero-subtitle">Nanotecnologia brasileira com validação científica internacional</p>
        <div className="investment-badge">Rodada de Investimento Aberta</div>
        <br/>
        <button onClick={scrollToInvestment} className="cta-button">
          Conhecer Oportunidade
        </button>
      </div>
    </section>
  );
}