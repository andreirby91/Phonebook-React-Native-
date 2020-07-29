import React from 'react';
import {Contact} from '../screens/Home';
import {Country} from '../components/AddNewContactModal';

export interface AppStateContext {
  contactsList: Contact[];
  countriesData: Country[];
  addContact: (contact: Contact) => void;
  removeContact: (contactId: number) => void;
}

export const DEFAULT_VALUE = {
  contactsList: [],
  countriesData: [],
  addContact: () => {},
  removeContact: () => {},
};

const AppStateContext = React.createContext<AppStateContext>(DEFAULT_VALUE);

export default AppStateContext;
