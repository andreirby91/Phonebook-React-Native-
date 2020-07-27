import React from 'react';
import ContactItem from '../../../src/components/ContactItem';

const ContactItemStory = () => {
  return (
    <ContactItem
      name="John Doe"
      phone="763 000 000"
      code="+40"
      sex="Male"
      country="Romania"
    />
  );
};

export default ContactItemStory;
