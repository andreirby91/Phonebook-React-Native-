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
    paddingVertical: 20,
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
    borderColor: 'grey',
    borderWidth: 0.5,
    marginTop: 10,
    fontSize: 17,
    borderRadius: 6,
  },
  countryCodePicker: {
    height: 110,
    width: 150,
  },
  submitBtn: {
    marginTop: 20,
  },
  pickerWrapper: {
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 10,
    borderColor: 'grey',
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
      let message = 'Please update all the fields in order to save a contact!';
      Alert.alert('Invalid Form', message);
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
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.container}>
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
        <View style={[styles.formControl, styles.pickerWrapper]}>
          <Picker
            itemStyle={{height: 110}}
            selectedValue={sex}
            onValueChange={(value) => setGender(value.toString())}>
            <Picker.Item label="Select gender" value="" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
        <PrimaryButton
          title="Add contact"
          onPress={handleSubmit}
          customStyle={styles.submitBtn}
        />
      </View>
    </ScrollView>
  );
};

export default AddNewContactModal;
