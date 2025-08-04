import React, { useEffect, useRef, useState } from 'react';

export function FinancialMetrics() {
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
      if (suffix === '%') {
        element.textContent = '+' + current + suffix;
      } else {
        element.textContent = current + suffix;
      }
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  const NumberCard = ({ value, label, animationData }: { 
    value: string; 
    label: string; 
    animationData: { start: number; end: number; duration: number; suffix: string; }
  }) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (isVisible && elementRef.current) {
        animateValue(elementRef.current, animationData.start, animationData.end, animationData.duration, animationData.suffix);
      }
    }, [isVisible, animationData]);

    return (
      <div className="number-card animate-on-scroll">
        <div ref={elementRef} className="number-value">
          {value}
        </div>
        <div className="number-label">{label}</div>
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="numbers">
      <div className="container">
        <h2 className="section-title animate-on-scroll">Números que Definem o Futuro</h2>
        <p className="section-subtitle animate-on-scroll">Uma trajetória consistente de crescimento e inovação</p>
        
        <div className="numbers-grid">
          <NumberCard 
            value="57M" 
            label="Mercado Brasileiro" 
            animationData={{ start: 0, end: 57, duration: 1500, suffix: 'M' }}
          />
          <NumberCard 
            value="290M" 
            label="Valuation (R$)" 
            animationData={{ start: 0, end: 290, duration: 1500, suffix: 'M' }}
          />
          <NumberCard 
            value="2" 
            label="Patentes INPI" 
            animationData={{ start: 0, end: 2, duration: 1000, suffix: '' }}
          />
          <NumberCard 
            value="+1100%" 
            label="Crescimento 3 Anos" 
            animationData={{ start: 0, end: 1100, duration: 2000, suffix: '%' }}
          />
        </div>
      </div>
    </section>
  );
}