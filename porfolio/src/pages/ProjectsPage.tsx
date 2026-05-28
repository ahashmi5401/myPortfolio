import React, { useEffect } from 'react';
import { Projects } from '../sections/Projects';

const ProjectsPage: React.FC = () => {
  useEffect(() => { document.title = 'Projects | Muhammad Ayan Hashmi'; }, []);
  return <Projects />;
};
export default ProjectsPage;
