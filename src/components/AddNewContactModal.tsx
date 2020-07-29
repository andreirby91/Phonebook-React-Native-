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
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import {Contact} from '../screens/Home';
import AppStateContext from '../context/app.context';

type Country = {
  name: string;
  callingCodes: string[];
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
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
    borderWidth: 1,
    marginTop: 10,
    fontSize: 17,
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

const AddNewContactModal: React.FC<Props> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [sex, setGender] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [countries, setCountries] = useState<Array<string>>([]);
  const [filteredCountries, setFilteredCountries] = useState<Array<string>>([]);
  const [codes, setCodes] = useState<Array<string>>([]);
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const {contactsList, addContact} = useContext(AppStateContext);

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = async () => {
    const request = await fetch(
      'https://restcountries.eu/rest/v2/all?fields=name;callingCodes',
    );
    const response = await request.json();
    setCountries(response.map((country: Country) => country.name));
    setFilteredCountries(response.map((country: Country) => country.name));
    setCountriesData(response);
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

    const id =
      (Math.max.apply(
        Math,
        contactsList.map((contact: Contact) => contact.id),
      ) || 0) + 1;

    const newContact = {
      id: 0,
      name,
      phone,
      sex,
      country,
      code,
    };
    console.log('newContact: ', newContact);
    addContact(newContact);
    navigation.goBack();
  };

  const onCountryValueChange = (value: string | number) => {
    setCountry(value.toString());
    const codesByCountry = countriesData.filter(
      (country) => country.name === value,
    );
    setCodes(codesByCountry.length ? codesByCountry[0].callingCodes : []);
    setCode(codesByCountry.length ? codesByCountry[0].callingCodes[0] : '');
  };

  const CodePicker = () => {
    return !codes[0] ? (
      <Text style={styles.noCode}>N/A</Text>
    ) : (
      <Picker
        itemStyle={styles.countryCodePicker}
        selectedValue={code}
        style={styles.formControl}
        onValueChange={(value) => setCode(value.toString())}>
        {codeItems}
      </Picker>
    );
  };

  const codeItems = codes.map((code) => {
    return <Picker.Item label={code} value={code} key={code} />;
  });

  const countryItems = filteredCountries.map((country) => {
    return <Picker.Item label={country} value={country} key={country} />;
  });

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
        <View style={{alignItems: 'center'}}>
          <Text style={styles.label}>Country:</Text>
          <TextInput
            style={styles.countryFilterInput}
            value={searchValue}
            onChangeText={(value) => {
              setSearchValue(value);
              const countryFilter = countries.filter((country) =>
                country.startsWith(value),
              );
              setFilteredCountries(countryFilter);
              if (countryFilter.length === 1) {
                onCountryValueChange(countryFilter[0]);
              }
            }}
            onSubmitEditing={() => setSearchValue('')}
            placeholder="Type your country"
          />
          <Picker
            itemStyle={styles.countryCodePicker}
            selectedValue={country}
            style={styles.formControl}
            onValueChange={(value: string | number) =>
              onCountryValueChange(value)
            }>
            {countries.length > filteredCountries.length
              ? countryItems
              : [
                  <Picker.Item label="Select country" value="" key="none" />,
                  ...countryItems,
                ]}
          </Picker>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.label}>Code:</Text>
          <CodePicker />
        </View>
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
