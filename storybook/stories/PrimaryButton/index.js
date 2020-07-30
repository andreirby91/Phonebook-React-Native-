import React from 'react';
import PrimaryButton from '../../../src/components/PrimaryButton';
import {Alert} from 'react-native';

const PrimaryButtonStory = () => {
  return (
    <PrimaryButton
      title="Primary Button"
      onPress={() => Alert.alert('Button pressed!')}
    />
  );
};

export default PrimaryButtonStory;
