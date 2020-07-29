import React from 'react';
import {AppStateContext} from '../context/app.context';
import {Contact} from '../screens/Home';

export const useAppState = (): AppStateContext => {
  const [state, setState] = React.useState<AppStateContext>({
    contactsList: [],
    addContact: () => {},
    removeContact: () => {},
  });

  function addContact(newContact: Contact) {
    setState((state) => ({
      ...state,
      contactsList: [newContact, ...state.contactsList],
    }));
  }

  function removeContact(contactId: number) {
    setState((state) => ({
      ...state,
      contactsList: state.contactsList.filter(
        (contact: Contact) => contact.id !== contactId,
      ),
    }));
  }

  return {
    contactsList: state.contactsList,
    addContact,
    removeContact,
  };
};
