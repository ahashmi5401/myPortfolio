import React, { useState, useRef } from 'react';
import { Mail, Phone, Check, Send, Loader2 } from 'lucide-react';
import { useGsapReveal } from '../hooks/useGsapReveal';

const Linkedin: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Github: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Contact: React.FC = () => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  useGsapReveal(sectionRef);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ success: boolean; message: string } | null>(null);

  const contactItems = [
    {
      type: 'Email',
      value: 'ahashmi5401@gmail.com',
      link: 'mailto:ahashmi5401@gmail.com',
      icon: <Mail size={20} />,
      copyable: true
    },
    {
      type: 'Phone',
      value: '0317-0254252',
      link: 'tel:03170254252',
      icon: <Phone size={20} />,
      copyable: true
    },
    {
      type: 'LinkedIn',
      value: 'Muhammad Ayan Hashmi',
      link: 'https://www.linkedin.com/in/muhammad-ayan-hashmi-1184a8383/',
      icon: <Linkedin size={20} />,
      copyable: false
    },
    {
      type: 'GitHub',
      value: 'Muhammad Ayan Hashmi',
      link: 'https://github.com/ahashmi5401',
      icon: <Github size={20} />,
      copyable: false
    }
  ];

  const handleCopy = (value: string, type: string) => {
    if (copiedType) return;
    
    navigator.clipboard.writeText(value).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Retrieve access key from env or fallback to a default instruction
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    if (accessKey === "YOUR_ACCESS_KEY_HERE" || !accessKey) {
      setSubmitStatus({
        success: false,
        message: "Please configure VITE_WEB3FORMS_ACCESS_KEY in your env settings or replace the placeholder in Contact.tsx to enable submissions."
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Thank you! Your message was sent successfully."
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || "Failed to send message. Please try again."
        });
      }
    } catch (err) {
      setSubmitStatus({
        success: false,
        message: "A network error occurred. Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="section contact-section">
      <div className="container">
        <div data-gsap="reveal">
          <div className="badge" style={{ marginBottom: '1.5rem' }}>Connection</div>
          <h2>Get In Touch</h2>
          <p className="contact-intro">
            Whether you want to build a high-performance web app, discuss smart systems, or just say hello, my inbox is open.
          </p>
        </div>

        <div className="contact-layout" data-gsap="stagger-group">
          {/* Left Column: Copyable Contact Details */}
          <div className="contact-info-list" data-gsap="stagger-item">
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              Direct Channels
            </h3>
            
            {contactItems.map((item, idx) => {
              const isCopied = copiedType === item.type;
              const cardContent = (
                <>
                  <div className="contact-icon-wrapper">{item.icon}</div>
                  <div className="contact-card-horizontal-content">
                    <span className="contact-label">{item.type}</span>
                    <span className="contact-value">{item.value}</span>
                  </div>
                  {item.copyable && (
                    <span className="contact-copy-tip">
                      {isCopied ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem', color: '#4cc969' }}>
                          <Check size={12} /> Copied!
                        </span>
                      ) : (
                        'Copy'
                      )}
                    </span>
                  )}
                </>
              );

              if (item.copyable) {
                return (
                  <div
                    key={idx}
                    className="contact-card-horizontal"
                    onClick={() => handleCopy(item.value, item.type)}
                  >
                    {cardContent}
                  </div>
                );
              }

              return (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-card-horizontal"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  {cardContent}
                </a>
              );
            })}
          </div>

          {/* Right Column: Web3Forms Submission Form */}
          <div data-gsap="stagger-item">
            <form onSubmit={handleSubmit} className="contact-form">
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
                Send A Message
              </h3>
              
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={14} />
                  </>
                )}
              </button>

              {submitStatus && (
                <div className={`form-status ${submitStatus.success ? 'form-status-success' : 'form-status-error'}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
        
        <footer style={{ marginTop: '6rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border)' }} data-gsap="reveal">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            &copy; {new Date().getFullYear()} Muhammad Ayan Hashmi. All rights reserved. Built with pure black &amp; gold.
          </p>
        </footer>
      </div>
    </section>
  );
};
