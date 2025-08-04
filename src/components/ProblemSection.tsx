import React from 'react';

export function ProblemSection() {
  return (
    <section className="problem">
      <div className="container">
        <h2 className="section-title animate-on-scroll">O Problema</h2>
        <p className="section-subtitle animate-on-scroll">Um mercado gigantesco completamente desatendido</p>
        
        <div className="problem-content">
          <div className="problem-visual animate-on-scroll">57M</div>
          <div className="problem-text animate-on-scroll">
            <h3>Milhões de brasileiros com necessidades especiais de cuidados dermatológicos</h3>
            <ul className="problem-list">
              <li>Produtos convencionais não atendem necessidades específicas</li>
              <li>Tratamentos especializados com alto custo e baixa acessibilidade</li>
              <li>Mercado subatendido com poucas soluções tecnológicas</li>
              <li>Falta de conhecimento sobre preparo adequado da pele</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}