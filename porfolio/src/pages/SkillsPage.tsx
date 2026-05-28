import React, { useEffect } from 'react';
import { Skills } from '../sections/Skills';

const SkillsPage: React.FC = () => {
  useEffect(() => { document.title = 'Skills | Muhammad Ayan Hashmi'; }, []);
  return <Skills />;
};
export default SkillsPage;
