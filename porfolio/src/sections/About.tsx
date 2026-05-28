import React, { useRef } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { useCountUp } from '../hooks/useCountUp';

const StatCard: React.FC<{ value: string; label: string }> = ({ value, label }) => {
  // Parse number and suffix (e.g. "20+" → 20, "+")
  const numMatch = value.match(/^([\d.]+)(\+?)$/);
  const numVal = numMatch ? parseFloat(numMatch[1]) : 0;
  const suffix = numMatch ? numMatch[2] : '';
  const decimals = numVal % 1 !== 0 ? 1 : 0;

  const countRef = useCountUp({ target: numVal, suffix, decimals });

  return (
    <div className="stat-card" data-gsap="stagger-item">
      <div className="stat-number">
        <span ref={countRef}>0{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const stats = [
    { value: '20+', label: 'Projects Completed' },
    { value: '2',   label: 'Live Products' },
    { value: '95+', label: 'Lighthouse Score' },
    { value: '3.5', label: 'GPA (Computer Eng.)' },
  ];

  return (
    <section ref={sectionRef} id="about" className="section">
      <div className="container">
        <div data-gsap="reveal">
          <div className="badge" style={{ marginBottom: '1.5rem' }}>About me</div>
          <h2 style={{ marginBottom: '2rem' }}>Architecting Interactive Digital Experiences</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'start' }} className="about-layout">
          <div data-gsap="reveal" data-gsap-delay="0.1" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <p>
              I am a passionate Front-End Developer and Computer Engineering student at SSUET Karachi. I specialize in building responsive, high-performance web applications using modern Javascript ecosystem technologies.
            </p>
            <p>
              My coding philosophy centers on minimalism, speed, and standard compliance. Whether it's designing pixel-accurate user interfaces or crafting complex state managements, I focus on writing clean, modular, and maintainable code.
            </p>
            <p>
              Currently, I am expanding my horizons into backend development and agentic AI architectures to design intelligent, autonomous full-stack systems.
            </p>
          </div>

          <div data-gsap="reveal" data-gsap-delay="0.2">
            <div className="about-info-card" style={{ padding: '1.5rem', border: '1px solid var(--border)', background: 'var(--card-bg)', borderRadius: '4px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Location:</span>
                  <span>Karachi, Pakistan</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Education:</span>
                  <span>SSUET (Computer Eng.)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                  <span style={{ color: '#4cc969' }}>Active &amp; Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated stat counter grid */}
        <div className="stat-grid" data-gsap="stagger-group" style={{ marginTop: '3rem' }}>
          {stats.map((stat, idx) => (
            <StatCard key={idx} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
};
