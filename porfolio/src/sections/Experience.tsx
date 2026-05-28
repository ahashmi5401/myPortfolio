import React, { useRef } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
}

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const experiences: ExperienceItem[] = [
    {
      role: 'Front-End Developer Intern',
      company: 'Aykays Agency',
      period: 'Dec 2025 – Feb 2026',
      location: 'Hybrid',
      points: [
        'Built 15+ reusable React components using standard props interfaces, accelerating local team development velocity by 20%.',
        'Led the migration of legacy Javascript codebases into Vite, realizing a 30% load time reduction and scoring 95+ on Lighthouse.',
        'Translated detailed Figma design wireframes into pixel-accurate, cross-device compatible responsive layouts.'
      ]
    },
    {
      role: 'Web Developer (Freelance)',
      company: 'Hex Software',
      period: 'Dec 2025 – Feb 2026',
      location: 'Remote',
      points: [
        'Created and optimized client-facing dashboard panels using React 18, React hooks, and Firebase database connections.',
        'Contributed to code reviews, asset optimization, and live production deployments to Vercel/Netlify with notable performance benefits.'
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="experience" className="section">
      <div className="container">
        <div data-gsap="reveal">
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Experience</div>
          <h2 style={{ marginBottom: '2rem' }}>Professional History</h2>
        </div>

        <div className="timeline" data-gsap="stagger-group" style={{ marginTop: '3rem' }}>
          {experiences.map((exp, idx) => (
            <div key={idx} className="timeline-item" data-gsap="stagger-item">
              <div className="timeline-marker"></div>
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-title">{exp.role}</h3>
                  <div className="timeline-subtitle">{exp.company}</div>
                </div>
                <div className="timeline-meta" style={{ textAlign: 'right' }}>
                  <div>{exp.period}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{exp.location}</div>
                </div>
              </div>
              <div className="timeline-content">
                <ul className="timeline-bullets">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
