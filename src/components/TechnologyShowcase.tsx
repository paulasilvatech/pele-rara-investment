import React from 'react';

export function TechnologyShowcase() {
  return (
    <section className="solution">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Nossa Solução</h2>
        <p className="section-subtitle animate-on-scroll">
          Ecossistema que alinha tecnologia farmacêutica,<br/>
          tecnologia digital e acolhimento emocional
        </p>
        
        <div className="tech-grid">
          <div className="tech-card animate-on-scroll">
            <div className="tech-name">BIOCIC</div>
            <h4>Nanotecnologia Regenerativa</h4>
            <p>Biomimética que garante absorção a nível celular e regeneração 2x mais rápida</p>
          </div>
          <div className="tech-card animate-on-scroll">
            <div className="tech-name">BIOBLOC</div>
            <h4>Limpeza Sensível</h4>
            <p>Tecnologia de limpeza com pH syndet que preserva a barreira cutânea</p>
          </div>
          <div className="tech-card animate-on-scroll">
            <div className="tech-name">IA NARA</div>
            <h4>Inteligência Artificial</h4>
            <p>Acompanhamento personalizado da evolução da pele do paciente</p>
          </div>
        </div>
      </div>
    </section>
  );
}