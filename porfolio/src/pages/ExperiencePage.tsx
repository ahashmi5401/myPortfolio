import React, { useEffect } from 'react';
import { Experience } from '../sections/Experience';

const ExperiencePage: React.FC = () => {
  useEffect(() => { document.title = 'Experience | Muhammad Ayan Hashmi'; }, []);
  return <Experience />;
};
export default ExperiencePage;
