import React, {useState, useEffect} from 'react';
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

type Country = {
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
    justifyContent: 'space-around',
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
  submitBtn: {
    marginTop: 20,
  },
});

const AddNewContactModal: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [sex, setGender] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [countries, setCountries] = useState<Array<string>>([]);
  const [codes, setCodes] = useState<Array<string>>([]);
  const [countriesData, setCountriesData] = useState<Country[]>([]);

  useEffect(() => {
    handleRequest();
  }, []);

  const handleRequest = async () => {
    const request = await fetch(
      'https://restcountries.eu/rest/v2/all?fields=name;callingCodes',
    );
    const response = await request.json();
    setCountries(response.map((country: Country) => country.name));
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

    const newContact = {
      name,
      phone,
      sex,
      country,
      code,
    };

    console.log('Submitted newContact: ', newContact);
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

  const countryItems = countries.map((country) => {
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
      <View style={styles.countryCode}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.label}>Country:</Text>
          <Picker
            itemStyle={styles.countryCodePicker}
            selectedValue={country}
            style={styles.formControl}
            onValueChange={(value: string | number) =>
              onCountryValueChange(value)
            }>
            {[
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
      <PrimaryButton
        title="Add contact"
        onPress={handleSubmit}
        customStyle={styles.submitBtn}
      />
    </ScrollView>
  );
};

export default AddNewContactModal;
