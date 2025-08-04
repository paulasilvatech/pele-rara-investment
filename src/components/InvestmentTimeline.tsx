import React from 'react';

export function InvestmentTimeline() {
  return (
    <section className="timeline">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Plano de Execução</h2>
        <p className="section-subtitle animate-on-scroll">Estratégia clara para os próximos 24 meses</p>
        
        <div className="timeline-container">
          <div className="timeline-item animate-on-scroll">
            <h4>Meses 1-6: Preparação e Estruturação</h4>
            <p>Captação de recursos, planejamento detalhado e início da construção da fábrica</p>
          </div>
          <div className="timeline-item animate-on-scroll">
            <h4>Meses 7-12: Construção e Expansão</h4>
            <p>Finalização da fábrica, contratação de equipe e lançamento de novos produtos</p>
          </div>
          <div className="timeline-item animate-on-scroll">
            <h4>Meses 13-18: Operação e Crescimento</h4>
            <p>Início da produção própria, expansão nacional e primeiras exportações</p>
          </div>
          <div className="timeline-item animate-on-scroll">
            <h4>Meses 19-24: Consolidação</h4>
            <p>Preparação para Série A, expansão internacional e licenciamento de tecnologias</p>
          </div>
        </div>
      </div>
    </section>
  );
}