import React from 'react';

export function InvestmentOpportunity() {
  const handleSendEmail = () => {
    const subject = encodeURIComponent('Interesse em Investir - Pele Rara');
    const body = encodeURIComponent(`Olá,

Tenho interesse em conhecer mais sobre a oportunidade de investimento na Pele Rara.

Gostaria de agendar uma reunião para discussão dos detalhes.

Atenciosamente,`);
    
    window.open(`mailto:contato@pelerara.com.br?subject=${subject}&body=${body}`);
  };

  return (
    <section className="investment" id="investment">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Oportunidade de Investimento</h2>
        <p className="section-subtitle animate-on-scroll">Participe da revolução do cuidado dermatológico brasileiro</p>
        
        <div className="investment-grid">
          <div className="investment-item animate-on-scroll">
            <h4>Modalidade</h4>
            <p>Mútuo Conversível</p>
          </div>
          <div className="investment-item animate-on-scroll">
            <h4>Meta de Captação</h4>
            <p>R$ 10 milhões</p>
          </div>
          <div className="investment-item animate-on-scroll">
            <h4>Ticket Mínimo</h4>
            <p>R$ 1 milhão</p>
          </div>
          <div className="investment-item animate-on-scroll">
            <h4>Prazo</h4>
            <p>24 meses</p>
          </div>
        </div>
      </div>
    </section>
  );
}