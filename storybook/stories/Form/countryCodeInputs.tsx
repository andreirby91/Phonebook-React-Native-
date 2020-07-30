import React from 'react';
import CountryCodeInputs from '../../../src/components/CountryCodeInputs';
import {View} from 'react-native';

const CountryCodeInputsStory = () => {
  return (
    <View style={{flex: 1}}>
      <CountryCodeInputs onCountryUpdate={() => {}} onCodeUpdate={() => {}} />
    </View>
  );
};

export default CountryCodeInputsStory;
