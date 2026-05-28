import React, { useEffect } from 'react';
import { Hackathons } from '../sections/Hackathons';

const HackathonsPage: React.FC = () => {
  useEffect(() => { document.title = 'Hackathons | Muhammad Ayan Hashmi'; }, []);
  return <Hackathons />;
};
export default HackathonsPage;
