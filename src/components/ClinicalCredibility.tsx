import React, { useEffect, useRef, useState } from 'react';

export function ClinicalCredibility() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateValue = (element: HTMLElement, start: number, end: number, duration: number, suffix = '') => {
    const startTimestamp = Date.now();
    const step = () => {
      const progress = Math.min((Date.now() - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      if (suffix === '+') {
        element.textContent = current + suffix;
      } else {
        element.textContent = current + suffix;
      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const ValidationCard = ({ value, label, description, animationData }: { 
    value: string; 
    label: string; 
    description: string;
    animationData: { start: number; end: number; duration: number; suffix: string; }
  }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isVisible && elementRef.current) {
        animateValue(elementRef.current, animationData.start, animationData.end, animationData.duration, animationData.suffix);
      }
    }, [isVisible, animationData]);

    return (
      <div className="validation-card animate-on-scroll">
        <div ref={elementRef} className="validation-number">
          {value}
        </div>
        <h4>{label}</h4>
        <p>{description}</p>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="validation">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Validação Científica e Mercado</h2>
        <p className="section-subtitle animate-on-scroll">Comprovação em instituições de referência internacional</p>
        
        <div className="validation-cards">
          <ValidationCard 
            value="6+" 
            label="Hospitais Parceiros" 
            description="Hospital do Amor - Barretos, HC-UFMG/USP, Hospital da Baleia, Associação Mineira do AVC, Fundação São Francisco de Assis"
            animationData={{ start: 0, end: 6, duration: 1000, suffix: '+' }}
          />
          <ValidationCard 
            value="3" 
            label="Publicações Internacionais" 
            description="Artigos científicos em periódicos de alto impacto"
            animationData={{ start: 0, end: 3, duration: 1000, suffix: '' }}
          />
          <ValidationCard 
            value="40K+" 
            label="Pacientes Atendidos" 
            description="Validação clínica com resultados comprovados"
            animationData={{ start: 0, end: 40, duration: 1500, suffix: 'K+' }}
          />
          <ValidationCard 
            value="11" 
            label="Produtos no Mercado" 
            description="Portfolio completo registrado na ANVISA"
            animationData={{ start: 0, end: 11, duration: 1000, suffix: '' }}
          />
        </div>

        {/* Seção adicional com detalhes dos estudos */}
        <div className="validation-details" style={{ marginTop: '80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ background: '#fafafa', padding: '40px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Estudos Clínicos em Andamento
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', color: '#666', fontWeight: '300' }}>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Testes in-vitro com queratinócitos
                </li>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Análise de marcadores inflamatórios
                </li>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Testes ex-vivo em pele humana
                </li>
              </ul>
            </div>

            <div style={{ background: '#fafafa', padding: '40px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Principais Hospitais Parceiros
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', color: '#666', fontWeight: '300' }}>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Hospital do Amor - Barretos/SP
                </li>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Hospital das Clínicas - UFMG
                </li>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Hospital das Clínicas - USP
                </li>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Hospital da Baleia - BH
                </li>
              </ul>
            </div>

            <div style={{ background: '#fafafa', padding: '40px', textAlign: 'center' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Reconhecimento Científico
              </h4>
              <ul style={{ listStyle: 'none', padding: '0', color: '#666', fontWeight: '300' }}>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  2 Patentes depositadas no INPI
                </li>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Valor das patentes: R$ 95-187M
                </li>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  34 formulações desenvolvidas
                </li>
                <li style={{ padding: '8px 0', position: 'relative', paddingLeft: '20px' }}>
                  <span style={{ position: 'absolute', left: '0', color: '#666' }}>•</span>
                  Todos os produtos registrados ANVISA
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}