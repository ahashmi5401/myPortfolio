import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { document.title = '404 | Muhammad Ayan Hashmi'; }, []);

  return (
    <section
      className="section"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '6rem',
            color: 'var(--accent)',
            lineHeight: 1,
            marginBottom: '1.5rem',
            opacity: 0.3,
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Page not found</h1>
        <p style={{ marginBottom: '2.5rem' }}>
          Looks like this page doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
      </div>
    </section>
  );
};
export default NotFoundPage;
