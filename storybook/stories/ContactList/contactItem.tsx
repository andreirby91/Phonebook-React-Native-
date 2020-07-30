import React from 'react';
import ContactItem from '../../../src/components/ContactItem';
import {Alert} from 'react-native';

const ContactItemStory = () => {
  return (
    <ContactItem
      name="John Doe"
      phone="763 000 000"
      code="+40"
      sex="Male"
      country="Romania"
      onRightPress={() => Alert.alert('Item was deleted.')}
    />
  );
};

export default ContactItemStory;
