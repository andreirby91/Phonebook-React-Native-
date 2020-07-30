import React from 'react';
import PrimaryButton from '../../../src/components/PrimaryButton';
import {Alert} from 'react-native';

const PrimaryButtonStory = ({hasIcon, title}) => {
  return (
    <PrimaryButton
      title={title}
      hasIcon={hasIcon}
      onPress={() => Alert.alert('Button pressed!')}
    />
  );
};

export default PrimaryButtonStory;
