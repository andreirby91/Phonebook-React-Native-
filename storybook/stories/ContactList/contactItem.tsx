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
      onRightPress={() => alert('Item was deleted.')}
    />
  );
};

export default ContactItemStory;
