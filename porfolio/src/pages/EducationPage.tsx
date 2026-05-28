import React, { useEffect } from 'react';
import { Education } from '../sections/Education';

const EducationPage: React.FC = () => {
  useEffect(() => { document.title = 'Education | Muhammad Ayan Hashmi'; }, []);
  return <Education />;
};
export default EducationPage;
