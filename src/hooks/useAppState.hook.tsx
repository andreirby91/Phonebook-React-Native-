import React from 'react';
import {AppStateContext} from '../context/app.context';
import {Contact} from '../screens/Home';
import {Country} from '../components/AddNewContactModal';
import AsyncStorage from '@react-native-community/async-storage';

export const useAppState = (): AppStateContext => {
  const [state, setState] = React.useState<AppStateContext>({
    contactsList: [],
    countriesList: [],
    addContact: () => {},
    removeContact: () => {},
    setCountriesDataToStorage: () => {},
    getCountriesDataFromStorage: () => {},
    getContactsFromStorage: () => {},
  });

  function addContact(newContact: Contact) {
    const newContactList = [newContact, ...state.contactsList];
    setState((state) => ({
      ...state,
      contactsList: newContactList,
    }));
    setContactsToStorage(newContactList);
  }

  function removeContact(contactId: number) {
    const newContactList = state.contactsList.filter(
      (contact: Contact) => contact.id !== contactId,
    );

    setState((state) => ({
      ...state,
      contactsList: newContactList,
    }));
    setContactsToStorage(newContactList);
  }

  async function setCountriesDataToStorage(data: Country[]) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@countries_data', jsonValue);
    } catch (e) {
      console.error('Error on set @countries_data to storage: ', e);
    }
  }
  async function getCountriesDataFromStorage() {
    try {
      const countriesData = await AsyncStorage.getItem('@countries_data');
      setState((state) => ({
        ...state,
        countriesList: countriesData != null ? JSON.parse(countriesData) : [],
      }));
    } catch (e) {
      console.error('Error on get @countries_data from storage: ', e);
    }
  }
  async function setContactsToStorage(data: Contact[]) {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@contacts_list', jsonValue);
    } catch (e) {
      console.error('Error on set @contacts_list to storage: ', e);
    }
  }
  async function getContactsFromStorage() {
    try {
      const contactsList = await AsyncStorage.getItem('@contacts_list');
      setState((state) => ({
        ...state,
        contactsList: contactsList != null ? JSON.parse(contactsList) : [],
      }));
    } catch (e) {
      console.error('Error on get @contacts_list from storage: ', e);
    }
  }

  return {
    contactsList: state.contactsList,
    countriesList: state.countriesList,
    addContact,
    removeContact,
    getCountriesDataFromStorage,
    setCountriesDataToStorage,
    getContactsFromStorage,
  };
};
