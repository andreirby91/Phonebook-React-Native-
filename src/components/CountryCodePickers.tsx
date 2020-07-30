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
    fontSize: 20,
    width: 150,
    paddingVertical: 11.5,
    textAlign: 'center',
  },
  countryCodePicker: {
    height: 110,
    width: 150,
  },
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

  const CodePicker = () => {
    const renderCodeItems = codes.map((code) => {
      return <Picker.Item label={code} value={code} key={code} />;
    });

    return (
      <View style={{width: 150}}>
        <Text style={styles.label}>Code:</Text>
        {!codes[0] ? (
          <View
            style={[
              styles.formControl,
              {
                borderWidth: 0.5,
                borderColor: 'grey',
                borderRadius: 4,
                marginTop: 10,
              },
            ]}>
            <Text style={styles.noCode}>N/A</Text>
          </View>
        ) : (
          <View
            style={[
              styles.formControl,
              {
                borderWidth: 0.5,
                borderColor: 'grey',
                borderRadius: 4,
                marginTop: 10,
              },
            ]}>
            <Picker
              itemStyle={[styles.countryCodePicker, {textAlign: 'center'}]}
              selectedValue={code}
              style={{width: 150}}
              onValueChange={(value) => {
                setCode(value.toString());
                onCodeUpdate(value.toString());
              }}>
              {renderCodeItems}
            </Picker>
          </View>
        )}
      </View>
    );
  };

  const CountryPicker = () => {
    const renderCountryItems = filteredCountries.map((country) => {
      return <Picker.Item label={country} value={country} key={country} />;
    });

    return (
      <View style={{width: 200}}>
        <Text style={styles.label}>Country:</Text>
        <View
          style={[
            styles.formControl,
            {
              borderWidth: 0.5,
              borderRadius: 4,
              marginTop: 10,
              borderColor: 'grey',
            },
          ]}>
          <Picker
            itemStyle={styles.countryCodePicker}
            selectedValue={country}
            style={[{width: 200}]}
            onValueChange={(value) => onCountryValueChange(value.toString())}>
            {countries.length > filteredCountries.length
              ? renderCountryItems
              : [
                  <Picker.Item label="Select country" value="" key="none" />,
                  ...renderCountryItems,
                ]}
          </Picker>
        </View>
      </View>
    );
  };

  return (
    <View>
      <TextInput
        style={[
          styles.formControl,
          {
            fontSize: 17,
            paddingHorizontal: 10,
            borderWidth: 0.5,
            borderRadius: 4,
            marginTop: 10,
            borderColor: 'grey',
          },
        ]}
        value={searchValue}
        onChangeText={(value) => {
          setSearchValue(value);
          const countryFilter = countries.filter((country) =>
            country.toLowerCase().startsWith(value.toLocaleLowerCase()),
          );
          setFilteredCountries(countryFilter);
          if (countryFilter.length) {
            onCountryValueChange(countryFilter[0]);
          }
        }}
        autoCorrect={false}
        placeholder="Filter countries"
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CountryPicker />
        <CodePicker />
      </View>
    </View>
  );
};

export default CountryCodePickers;
