import React, { useRef } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface HackathonItem {
  title: string;
  role: string;
  date: string;
  location: string;
  description: string;
}

export const Hackathons: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const hackathons: HackathonItem[] = [
    {
      title: 'SENTEC NED Hackathon',
      role: '5-Day Rapid Sprint Challenge',
      date: 'Oct 2025',
      location: 'NED University',
      description: 'Engineered a disaster management portal from scratch. Contributed UI components, real-time telemetry graphics, and a functional supply chain tracking system for flood assistance distribution.'
    },
    {
      title: 'SMIT Mini-Hackathon',
      role: '12-Hour Prototyping Sprint',
      date: 'Nov 2025',
      location: 'Saylani Mass IT Training',
      description: 'Programmed Webify, a full social interaction CRUD platform featuring customized local accounts and session authentication in a framework-free environment in under 12 hours.'
    }
  ];

  return (
    <section ref={sectionRef} id="hackathons" className="section">
      <div className="container">
        <div data-gsap="reveal">
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Competitions</div>
          <h2 style={{ marginBottom: '2rem' }}>Hackathons &amp; Sprints</h2>
        </div>

        <div className="timeline" data-gsap="stagger-group" style={{ marginTop: '3rem' }}>
          {hackathons.map((hack, idx) => (
            <div key={idx} className="timeline-item" data-gsap="stagger-item">
              <div className="timeline-marker"></div>
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-title">{hack.title}</h3>
                  <div className="timeline-subtitle" style={{ color: 'var(--text-muted)' }}>{hack.role}</div>
                </div>
                <div className="timeline-meta" style={{ textAlign: 'right' }}>
                  <div>{hack.date}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{hack.location}</div>
                </div>
              </div>
              <div className="timeline-content" style={{ marginTop: '0.5rem' }}>
                <p>{hack.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
