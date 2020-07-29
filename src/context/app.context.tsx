import React from 'react';
import {Contact} from '../screens/Home';

export interface AppStateContext {
  contactsList: Contact[];
  addContact: (contact: Contact) => void;
  removeContact: (contactId: number) => void;
}

export const DEFAULT_VALUE = {
  contactsList: [],
  addContact: () => {},
  removeContact: () => {},
};

const AppStateContext = React.createContext<AppStateContext>(DEFAULT_VALUE);

export default AppStateContext;
