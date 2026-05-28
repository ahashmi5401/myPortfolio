import React, { useEffect } from 'react';
import { Hero } from '../sections/Hero';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => { document.title = 'Muhammad Ayan Hashmi | Front-End Developer'; }, []);
  return (
    <Hero
      onProjectsClick={() => navigate('/projects')}
      onContactClick={() => navigate('/contact')}
    />
  );
};
export default HomePage;
