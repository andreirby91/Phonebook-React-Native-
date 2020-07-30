import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import PrimaryButton from './PrimaryButton';
import {Contact} from '../screens/Home';
import AppStateContext from '../context/app.context';
import CountryCodePickers from './CountryCodePickers';
import CountryCodeInputs from './CountryCodeInputs';
import {getCountriesData} from '../services/countries.service';

export type Country = {
  name: string;
  callingCodes: string[];
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  countryCode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formControl: {
    marginBottom: 25,
  },
  label: {
    fontSize: 20,
  },
  textInput: {
    height: 50,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    marginTop: 10,
    fontSize: 17,
    borderRadius: 6,
  },
  noCode: {
    marginTop: 40,
    fontSize: 20,
    width: 150,
    textAlign: 'center',
  },
  countryCodePicker: {height: 110, width: 150},
  countryFilterInput: {
    height: 40,
    width: 150,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
  },
  submitBtn: {
    marginTop: 20,
  },
});

const AddNewContactModal: React.FC<any> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [sex, setGender] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const {
    contactsList,
    countriesList,
    addContact,
    setCountriesList,
    getCountriesDataFromStorage,
  } = useContext(AppStateContext);

  useEffect(() => {
    !countriesList.length ? handleRequest() : getCountriesDataFromStorage();
  }, []);

  const handleRequest = async () => {
    const countriesData = await getCountriesData();
    setCountriesList(countriesData);
  };

  const handleSubmit = () => {
    if (!name || !phone || !sex || !country) {
      let message = `"${!name ? 'Name ' : ''} ${!phone ? 'Phone ' : ''} ${
        !sex ? 'Gender ' : ''
      } ${!country ? 'Country ' : ' '}" are not filled.
      
      Please update them in order to save a contact!`;
      Alert.alert(message);
      return;
    }

    const id = contactsList.length
      ? Math.max.apply(
          Math,
          contactsList.map((contact: Contact) => contact.id),
        ) + 1
      : 0;

    const newContact = {
      id,
      name,
      phone,
      sex,
      country,
      code,
    };

    addContact(newContact);
    navigation ? navigation.goBack() : null;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        placeholder="Type your name"
        style={[styles.formControl, styles.textInput]}
        onChangeText={(text) => setName(text)}
        value={name}
        autoFocus={true}
        maxLength={30}
      />
      <Text style={styles.label}>Phone:</Text>
      <TextInput
        placeholder="Phone"
        style={[styles.formControl, styles.textInput]}
        onChangeText={(text) => setPhone(text)}
        value={phone}
        keyboardType="numeric"
        maxLength={20}
      />
      <View style={styles.countryCode}>
        {countriesList.length ? (
          <CountryCodePickers
            onCodeUpdate={(code) => setCode(code)}
            onCountryUpdate={(country) => setCountry(country)}
          />
        ) : (
          <CountryCodeInputs
            onCodeUpdate={(code) => setCode(code)}
            onCountryUpdate={(country) => setCountry(country)}
          />
        )}
      </View>
      <Text style={styles.label}>Gender:</Text>
      <Picker
        itemStyle={{height: 110}}
        selectedValue={sex}
        style={styles.formControl}
        onValueChange={(value) => setGender(value.toString())}>
        <Picker.Item label="Select gender" value="" />
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
      <PrimaryButton
        title="Add contact"
        onPress={handleSubmit}
        customStyle={styles.submitBtn}
      />
    </ScrollView>
  );
};

export default AddNewContactModal;
