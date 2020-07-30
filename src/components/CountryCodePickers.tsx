import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Country} from './AddNewContactModal';
import AppStateContext from '../context/app.context';

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    padding: 10,
    borderColor: 'gray',
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
  noCode: {
    marginTop: 40,
    fontSize: 20,
    width: 150,
    textAlign: 'center',
  },
  countryCodePicker: {height: 110, width: 150},
  countryFilterInput: {
    height: 40,
    width: 180,
    padding: 10,
    paddingHorizontal: 20,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 10,
  },
});

const CountryCodePickers = ({
  onCountryUpdate,
  onCodeUpdate,
}: {
  onCountryUpdate: (country: string) => void;
  onCodeUpdate: (code: string) => void;
}) => {
  const [country, setCountry] = useState('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [countries, setCountries] = useState<Array<string>>([]);
  const [filteredCountries, setFilteredCountries] = useState<Array<string>>([]);
  const [code, setCode] = useState<string>('');
  const [codes, setCodes] = useState<Array<string>>([]);
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const {countriesList} = useContext(AppStateContext);

  useEffect(() => {
    handleCountriesStateUpdate(countriesList);
  }, []);

  const handleCountriesStateUpdate = (data: Country[]) => {
    setCountries(data.map((country: Country) => country.name));
    setFilteredCountries(data.map((country: Country) => country.name));
    setCountriesData(data);
  };

  const onCountryValueChange = (value: string) => {
    setCountry(value);
    onCountryUpdate(value);
    const codesByCountry = countriesData.filter(
      (country) => country.name === value,
    );
    const newCode = codesByCountry.length
      ? codesByCountry[0].callingCodes[0]
      : '';
    const newCodes = codesByCountry.length
      ? codesByCountry[0].callingCodes
      : [];
    setCodes(newCodes);
    setCode(newCode);
    onCodeUpdate(newCode);
  };

  const renderCodeItems = codes.map((code) => {
    return <Picker.Item label={code} value={code} key={code} />;
  });

  const renderCountryItems = filteredCountries.map((country) => {
    return <Picker.Item label={country} value={country} key={country} />;
  });

  const CodePicker = () => {
    return !codes[0] ? (
      <Text style={styles.noCode}>N/A</Text>
    ) : (
      <Picker
        itemStyle={styles.countryCodePicker}
        selectedValue={code}
        style={styles.formControl}
        onValueChange={(value) => {
          setCode(value.toString());
          onCodeUpdate(value.toString());
        }}>
        {renderCodeItems}
      </Picker>
    );
  };

  return (
    <>
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
            if (countryFilter.length) {
              onCountryValueChange(countryFilter[0]);
            }
          }}
          onSubmitEditing={() => setSearchValue('')}
          onBlur={() => setSearchValue('')}
          autoCorrect={false}
          placeholder="Search your country"
        />
        <Picker
          itemStyle={styles.countryCodePicker}
          selectedValue={country}
          style={styles.formControl}
          onValueChange={(value) => onCountryValueChange(value.toString())}>
          {countries.length > filteredCountries.length
            ? renderCountryItems
            : [
                <Picker.Item label="Select country" value="" key="none" />,
                ...renderCountryItems,
              ]}
        </Picker>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.label}>Code:</Text>
        <CodePicker />
      </View>
    </>
  );
};

export default CountryCodePickers;
