import React from 'react';

export function InvestorFAQ() {
  const handleSendEmail = () => {
    const subject = encodeURIComponent('Interesse em Investir - Pele Rara');
    const body = encodeURIComponent(`Olá,

Tenho interesse em conhecer mais sobre a oportunidade de investimento na Pele Rara.

Gostaria de agendar uma reunião para discussão dos detalhes.

Atenciosamente,`);
    
    window.open(`mailto:contato@pelerara.com.br?subject=${subject}&body=${body}`);
  };

  return (
    <section className="cta-section">
      <div className="container">
        <h2 className="animate-on-scroll">Faça Parte Desta História</h2>
        <p className="animate-on-scroll">
          Invista em tecnologia patenteada com validação científica<br/>
          e um mercado de R$ 3,7 trilhões globalmente
        </p>
        <button onClick={handleSendEmail} className="cta-primary animate-on-scroll">
          Solicitar Apresentação Completa
        </button>
      </div>
    </section>
  );
}