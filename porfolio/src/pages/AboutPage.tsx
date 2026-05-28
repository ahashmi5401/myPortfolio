import React, { useEffect } from 'react';
import { About } from '../sections/About';

const AboutPage: React.FC = () => {
  useEffect(() => { document.title = 'About | Muhammad Ayan Hashmi'; }, []);
  return <About />;
};
export default AboutPage;
