import React, { useRef } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';

export const CurrentlyLearning: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const backendSkills = [
    'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 
    'GraphQL', 'WebSockets', 'Multer (Files)', 'Payment Gateway', 
    'Docker', 'CI/CD', 'Scalable Caching', 'Message Queues', 
    'Cloud Deployment', 'Nginx Reverse Proxy'
  ];

  const aiSkills = [
    'Claude Agent SDK', 'Model Context Protocol', 'RAG Pipelines', 'FastAPI', 
    'Multi-Agent orchestration', 'Kubernetes', 'Apache Kafka', 'Multi-Cloud Deploy'
  ];

  return (
    <section ref={sectionRef} id="currently-learning" className="section">
      <div className="container">
        <div data-gsap="reveal">
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Growth</div>
          <h2 style={{ marginBottom: '2rem' }}>Currently Learning &amp; Upskilling</h2>
        </div>

        <div className="learning-layout" data-gsap="stagger-group">
          {/* Card 1: Backend Development */}
          <div className="learning-card" data-gsap="stagger-item">
            <h3>Backend Development</h3>
            <div className="learning-subtitle">SMIT Program</div>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Expanding my frontend skills into robust, scalable server environments and databases:
            </p>
            <div className="learning-grid">
              {backendSkills.map((skill, idx) => (
                <div key={idx} className="learning-item">{skill}</div>
              ))}
            </div>
          </div>

          {/* Card 2: Certified Agentic AI Architect */}
          <div className="learning-card" data-gsap="stagger-item">
            <h3>Agentic AI Architect</h3>
            <div className="learning-subtitle">PIAIC / Panaversity (Enrolled May 2026)</div>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Building autonomous workflows, LLM agents, context servers, and event-driven systems:
            </p>
            <div className="learning-grid">
              {aiSkills.map((skill, idx) => (
                <div key={idx} className="learning-item">{skill}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
