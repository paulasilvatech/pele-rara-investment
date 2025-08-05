import React from 'react';

interface InvestmentTimelineProps {
  t: {
    timelineTitle: string;
    timelineSubtitle: string;
    timeline1Title: string;
    timeline1Description: string;
    timeline2Title: string;
    timeline2Description: string;
    timeline3Title: string;
    timeline3Description: string;
    timeline4Title: string;
    timeline4Description: string;
    timeline5Title: string;
    timeline5Description: string;
    timeline6Title: string;
    timeline6Description: string;
  };
}

export function InvestmentTimeline({ t }: InvestmentTimelineProps) {
  return (
    <section className="timeline">
      <div className="container">
        <h2 className="section-title animate-on-scroll">{t.timelineTitle}</h2>
        <p className="section-subtitle animate-on-scroll">{t.timelineSubtitle}</p>
        
        <div className="timeline-container">
          <div className="timeline-item animate-on-scroll">
            <h4>{t.timeline1Title}</h4>
            <p>{t.timeline1Description}</p>
          </div>
          <div className="timeline-item animate-on-scroll">
            <h4>{t.timeline2Title}</h4>
            <p>{t.timeline2Description}</p>
          </div>
          <div className="timeline-item animate-on-scroll">
            <h4>{t.timeline3Title}</h4>
            <p>{t.timeline3Description}</p>
          </div>
          <div className="timeline-item animate-on-scroll">
            <h4>{t.timeline4Title}</h4>
            <p>{t.timeline4Description}</p>
          </div>
          <div className="timeline-item animate-on-scroll">
            <h4>{t.timeline5Title}</h4>
            <p>{t.timeline5Description}</p>
          </div>
          <div className="timeline-item animate-on-scroll">
            <h4>{t.timeline6Title}</h4>
            <p>{t.timeline6Description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}