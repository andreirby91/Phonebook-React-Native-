import React, {useState, useEffect} from 'react';
import {View, TextInput, Text, Picker, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  picker: {
    flex: 1,
  },
});

const AddNewContactModal = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sex, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');
  const [countries, setCountries] = useState([]);
  const [codes, setCodes] = useState([]);
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = async () => {
    const request = await fetch(
      'https://restcountries.eu/rest/v2/all?fields=name;callingCodes',
    );
    const response = await request.json();
    setCountries(response.map((country) => country.name));
    setCountriesData(response);
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setName(text)}
        value={name}
      />
      <TextInput
        placeholder="Phone"
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => setPhone(text)}
        value={phone}
      />
      <Text>Gender:</Text>
      <Picker
        itemStyle={styles.picker}
        selectedValue={sex}
        style={{height: 50}}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <Text>Country:</Text>
      <Picker
        itemStyle={styles.picker}
        selectedValue={country}
        style={{height: 50}}
        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <Text>Code:</Text>
      <Picker
        itemStyle={styles.picker}
        selectedValue={code}
        style={{height: 50}}
        onValueChange={(itemValue, itemIndex) => setCode(itemValue)}>
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
    </View>
  );
};

export default AddNewContactModal;
