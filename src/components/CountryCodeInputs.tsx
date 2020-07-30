import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
    marginTop: 10,
    fontSize: 17,
  },
  formControl: {
    marginBottom: 25,
  },
  label: {
    fontSize: 20,
  },
});

const CountryCodeInputs = ({
  onCountryUpdate,
  onCodeUpdate,
}: {
  onCountryUpdate: (country: string) => void;
  onCodeUpdate: (code: string) => void;
}) => {
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{flex: 1}}>
        <Text style={styles.label}>Country:</Text>
        <TextInput
          placeholder="Type your country"
          style={[styles.formControl, styles.textInput]}
          onChangeText={(text) => {
            setCountry(text);
            onCountryUpdate(text);
          }}
          value={country}
          maxLength={30}
        />
      </View>
      <View style={{width: 150, marginLeft: 20}}>
        <Text style={styles.label}>Code:</Text>
        <TextInput
          placeholder="Type your code"
          style={[styles.formControl, styles.textInput]}
          onChangeText={(text) => {
            setCode(text);
            onCodeUpdate(text);
          }}
          value={code}
          maxLength={30}
        />
      </View>
    </View>
  );
};

export default CountryCodeInputs;
