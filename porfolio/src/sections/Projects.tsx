import React, { useState, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGsapReveal } from '../hooks/useGsapReveal';

const Github: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface Project {
  title: string;
  subtitle?: string;
  date: string;
  liveUrl?: string;
  githubUrl?: string;
  stack: string[];
  points: string[];
  image: string;
}

export const Projects: React.FC = () => {
  const [expandedCards, setExpandedCards] = useState<Record<number, boolean>>({});
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);

  const toggleExpand = (idx: number) => {
    setExpandedCards((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const projects: Project[] = [
    {
      title: 'Smart EMS — Enterprise Management System',
      date: 'Dec 2025',
      liveUrl: 'https://employee-management-system-a2h4.vercel.app',
      githubUrl: 'https://github.com/ahashmi5401/Employee-Management-System',
      stack: ['React 19', 'Firebase', 'Firestore', 'TypeScript', 'RBAC'],
      image: '/project_smart_ems.png',
      points: [
        'Designed and implemented a secure Triple-Tier Role-Based Access Control (RBAC) system.',
        'Established 100% tenant data isolation via complex Firebase Security Rules.',
        'Achieved a 30% data synchronization speed improvement by structuring a flat NoSQL architecture.',
      ],
    },
    {
      title: 'Webify — Social CRUD Platform',
      subtitle: 'SMIT Mini-Hackathon (12-Hour Sprint)',
      date: 'Nov 2025',
      liveUrl: 'https://systemengaging.netlify.app',
      stack: ['Vanilla JS', 'LocalStorage', 'Custom Auth', 'HTML5', 'CSS3'],
      image: '/project_webify.png',
      points: [
        'Developed a fully functional social platform with post publishing, updating, and removal controls.',
        'Engineered local storage custom user authentication flows without backend frameworks.',
        'Delivered complete product within a high-pressure, 12-hour hackathon sprint constraint.',
      ],
    },
    {
      title: 'Disaster Management Portal',
      subtitle: 'SENTEC NED Hackathon (5-Day Sprint)',
      date: 'Oct 2025',
      stack: ['React', 'Data Visualization', 'Real-time Dashboard', 'AI Integration'],
      image: '/project_disaster_portal.png',
      points: [
        'Co-built in collaboration with an AI Engineer to create automated emergency response pathways.',
        'Created real-time damage metric charts and maps for disaster responders.',
        'Designed supply chain tracking dashboards to streamline food and medical aid for flood relief.',
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="projects" className="section">
      <div className="container">
        <div data-gsap="reveal">
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Portfolio</div>
          <h2 style={{ marginBottom: '2rem' }}>Featured Projects</h2>
        </div>

        <div className="projects-grid" data-gsap="stagger-group">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card" data-gsap="stagger-item">
              {/* Project Image */}
              <div className="project-image-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-image-overlay">
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
                        <Github size={13} /> Repo
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
                        <ExternalLink size={13} /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.75rem' }}>
                <div className="project-header" style={{ marginBottom: '1rem' }}>
                  <div>
                    <h3 className="project-title">{project.title}</h3>
                    {project.subtitle && (
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', marginTop: '0.25rem' }}>
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                  <div className="project-meta">
                    <span>{project.date}</span>
                  </div>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <ul className="project-bullet-list" style={{ marginBottom: '0.5rem' }}>
                    {project.points.length > 0 && (
                      <li>{project.points[0]}</li>
                    )}
                    <AnimatePresence initial={false}>
                      {expandedCards[idx] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}
                        >
                          {project.points.slice(1).map((point, pIdx) => (
                            <li key={pIdx}>{point}</li>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </ul>

                  {project.points.length > 1 && (
                    <button
                      onClick={() => toggleExpand(idx)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontWeight: 400,
                        transition: 'color 0.2s ease',
                      }}
                      className="read-more-btn"
                    >
                      {expandedCards[idx] ? 'Read Less ↑' : 'Read More ↓'}
                    </button>
                  )}
                </div>

                <ul className="project-tags">
                  {project.stack.map((tech, tIdx) => (
                    <li key={tIdx} className="project-tag">{tech}</li>
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
