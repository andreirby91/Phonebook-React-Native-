import React, {useState, useContext, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {Country} from './AddNewContactModal';
import AppStateContext from '../context/app.context';

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
  noCode: {
    fontSize: 20,
    width: 150,
    paddingVertical: 11.5,
    textAlign: 'center',
  },
  countryCodePicker: {
    height: 110,
  },
  formControlWrapper: {
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 4,
    marginTop: 10,
  },
  countryFilter: {
    fontSize: 17,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 0.5,
    borderRadius: 4,
    marginTop: 10,
    borderColor: 'grey',
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
      <View style={{width: 150, marginLeft: 20}}>
        <Text style={styles.label}>Code:</Text>
        {!codes[0] ? (
          <View style={[styles.formControl, styles.formControlWrapper]}>
            <Text style={styles.noCode}>N/A</Text>
          </View>
        ) : (
          <View style={[styles.formControl, styles.formControlWrapper]}>
            <Picker
              itemStyle={[styles.countryCodePicker]}
              selectedValue={code}
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
      <View style={{flex: 1}}>
        <Text style={styles.label}>Country:</Text>
        <View style={[styles.formControl, styles.formControlWrapper]}>
          <Picker
            itemStyle={styles.countryCodePicker}
            selectedValue={country}
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
    <View style={{flex: 1}}>
      <TextInput
        style={[styles.formControl, styles.countryFilter]}
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
