import React from 'react';
import EmptyContactList from '../../../src/components/EmptyContactList';

const EmptyContactListStory = () => (
  <EmptyContactList onPress={() => alert('Button pressed!')} />
);

export default EmptyContactListStory;
