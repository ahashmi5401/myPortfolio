import React, { useEffect } from 'react';
import { CurrentlyLearning } from '../sections/CurrentlyLearning';

const LearningPage: React.FC = () => {
  useEffect(() => { document.title = 'Currently Learning | Muhammad Ayan Hashmi'; }, []);
  return <CurrentlyLearning />;
};
export default LearningPage;
