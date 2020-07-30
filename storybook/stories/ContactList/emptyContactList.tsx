import React from 'react';
import EmptyContactList from '../../../src/components/EmptyContactList';
import {Alert} from 'react-native';

const EmptyContactListStory = () => (
  <EmptyContactList onPress={() => Alert.alert('Button pressed!')} />
);

export default EmptyContactListStory;
