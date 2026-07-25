import React, { useRef } from 'react';
import { useGsapReveal } from '../hooks/useGsapReveal';

interface Skill {
  name: string;
  learning?: boolean;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const categories: SkillCategory[] = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React 19' },
        { name: 'Next.js' },
        { name: 'TypeScript' },
        { name: 'JavaScript ES6+' },
        { name: 'Tailwind CSS' },
        { name: 'Bootstrap' },
        { name: 'Material UI' },
        { name: 'Shadcn UI' }
      ]
    },
    {
      title: 'State & Tooling',
      skills: [
        { name: 'Redux' },
        { name: 'Redux Toolkit' },
        { name: 'Vite' },
        { name: 'Git' },
        { name: 'GitHub' }
      ]
    },
    {
      title: 'Backend & DB',
      skills: [
        { name: 'Firebase' },
        { name: 'Firestore' },
        { name: 'Node.js' },
        { name: 'Express'},
        { name: 'MongoDB'},
        { name: 'PostgreSQL', learning: true }
      ]
    },
    {
      title: 'Data & AI',
      skills: [
        { name: 'Python' },
        { name: 'NumPy' },
        { name: 'Pandas' },
        { name: 'Scikit-Learn' },
        { name: 'Power BI' }
      ]
    },
    {
      title: 'DevOps',
      skills: [
        { name: 'Docker', learning: true },
        { name: 'CI/CD', learning: true },
        { name: 'Kubernetes', learning: true }
      ]
    },
    {
      title: 'Concepts',
      skills: [
        { name: 'System Design' },
        { name: 'Microservices' },
        { name: 'RBAC' },
        { name: 'REST APIs' },
        { name: 'Event-Driven' },
        { name: 'Redis' },
        { name: 'Message Queues' },
        { name: 'Load Balancing' },
        { name: 'API Gateway' }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="section">
      <div className="container">
        <div data-gsap="reveal">
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Skills</div>
          <h2 style={{ marginBottom: '2rem' }}>Technical Skillset</h2>
        </div>

        <div className="skills-grid" data-gsap="stagger-group" style={{ marginTop: '3rem' }}>
          {categories.map((category, idx) => (
            <div key={idx} className="skill-category" data-gsap="stagger-item">
              <h3>{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="skill-item">
                    {skill.name}
                    {skill.learning && (
                      <span style={{ color: 'var(--accent)', fontSize: '0.65rem', marginLeft: '0.25rem', opacity: 0.8 }}>
                        *
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
