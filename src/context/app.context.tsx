import React from 'react';
import {Contact} from '../screens/Home';
import {Country} from '../components/AddNewContactModal';

export interface AppStateContext {
  contactsList: Contact[];
  countriesList: Country[];
  addContact: (contact: Contact) => void;
  removeContact: (contactId: number) => void;
  setCountriesList: (countries: Country[]) => void;
  getContactsFromStorage: () => void;
  setCountriesDataToStorage: (countries: Country[]) => void;
  getCountriesDataFromStorage: () => void;
}

export const DEFAULT_VALUE = {
  contactsList: [],
  countriesList: [],
  addContact: () => {},
  removeContact: () => {},
  setCountriesList: () => {},
  getContactsFromStorage: () => {},
  setCountriesDataToStorage: () => {},
  getCountriesDataFromStorage: () => {},
};

const AppStateContext = React.createContext<AppStateContext>(DEFAULT_VALUE);

export default AppStateContext;
