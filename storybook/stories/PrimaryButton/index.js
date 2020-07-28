import React from 'react';
import PrimaryButton from '../../../src/components/PrimaryButton';

const PrimaryButtonStory = () => {
  return (
    <PrimaryButton
      title="Primary Button"
      onPress={() => alert('Button pressed!')}
    />
  );
};

export default PrimaryButtonStory;
