import {Alert} from 'react-native';

export async function getCountriesData() {
  try {
    const request = await fetch(
      'https://restcountries.eu/rest/v2/all?fields=name;callingCodes',
    );
    const response = await request.json();
    return response;
  } catch (error) {
    Alert.alert(
      'Warning',
      "It seems that we couldn't get you the list of contries and codes. \n\nPlease try again later or enter them manually.",
    );
    return [];
  }
}
