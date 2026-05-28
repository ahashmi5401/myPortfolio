import React, { useRef } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  status: string;
}

export const Education: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const educationList: EducationItem[] = [
    {
      institution: 'Sir Syed University of Engineering and Technology (SSUET)',
      degree: 'B.S. Computer Engineering (GPA: 3.5 / 4.0)',
      period: '2025 – 2029',
      status: 'Enrolled'
    },
    {
      institution: 'PIAIC / Panaversity',
      degree: 'Certified Agentic AI Architect',
      period: 'May 2026 – Present',
      status: 'In Progress'
    },
    {
      institution: 'NED University of Engineering and Technology (PITP)',
      degree: 'Certified Data Science Specialist',
      period: 'May – Nov 2025',
      status: 'Completed'
    },
    {
      institution: 'Saylani Mass IT Training (SMIT)',
      degree: 'Modern Web Development',
      period: 'May 2025 – Present',
      status: 'In Progress'
    }
  ];

  return (
    <section ref={sectionRef} id="education" className="section">
      <div className="container">
        <div data-gsap="reveal">
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Studies</div>
          <h2 style={{ marginBottom: '2rem' }}>Education &amp; Credentials</h2>
        </div>

        <div className="timeline" data-gsap="stagger-group" style={{ marginTop: '3rem' }}>
          {educationList.map((edu, idx) => (
            <div key={idx} className="timeline-item" data-gsap="stagger-item">
              <div className="timeline-marker"></div>
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-title">{edu.institution}</h3>
                  <div className="timeline-subtitle" style={{ color: 'var(--text-muted)' }}>{edu.degree}</div>
                </div>
                <div className="timeline-meta" style={{ textAlign: 'right' }}>
                  <div>{edu.period}</div>
                  <div style={{ color: 'var(--accent)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>{edu.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
