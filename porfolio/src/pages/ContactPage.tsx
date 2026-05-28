import React, { useEffect } from 'react';
import { Contact } from '../sections/Contact';

const ContactPage: React.FC = () => {
  useEffect(() => { document.title = 'Contact | Muhammad Ayan Hashmi'; }, []);
  return <Contact />;
};
export default ContactPage;
