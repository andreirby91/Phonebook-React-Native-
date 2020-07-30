import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList, Alert} from 'react-native';
import ContactItem from '../components/ContactItem';
import Search from '../components/Search';
import EmptyContactList from '../components/EmptyContactList';
import AppStateContext from '../context/app.context';
import PrimaryButton from '../components/PrimaryButton';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

export type Contact = {
  id: number;
  name: string;
  phone: string;
  sex: string;
  country: string;
  code: string;
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: 20,
  },
  emptyListIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  addContact: {
    minWidth: 40,
    height: 40,
    marginLeft: 20,
  },
});

const Home: React.FC<any> = ({navigation}) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [myContacts, setMyContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const {contactsList, getContactsFromStorage, removeContact} = useContext(
    AppStateContext,
  );

  useEffect(() => {
    getContactsFromStorage();
  }, []);

  useEffect(() => {
    handleContactUpdates(contactsList);
  }, [contactsList]);

  const handleFilteringByType = (input: string) => {
    let isNumRegex = /^[0-9]+$/;
    const filterBy = isNumRegex.test(input) ? 'phone' : 'name';
    const filteredItems = myContacts.filter((contact: Contact) =>
      contact[filterBy].toLowerCase().includes(input.toLowerCase()),
    );

    return filteredItems;
  };

  const handleSearch = (text: any) => {
    setSearchValue(text);
    setFilteredContacts(handleFilteringByType(text));
  };

  const handleContactUpdates = (contacts: Contact[]) => {
    setMyContacts(contacts);
    setFilteredContacts(contacts);
  };

  const handleDelete = (contactId: number) => {
    removeContact(contactId);
  };

  const ListEmptyComponent = () => {
    return myContacts.length ? (
      <View style={styles.emptyList}>
        <FontistoIcon name="rains" style={styles.emptyListIcon} />
        <Text style={styles.emptyListText}>No contacts found!</Text>
      </View>
    ) : (
      <EmptyContactList onPress={() => navigation.navigate('AddContact')} />
    );
  };

  return (
    <>
      <View style={styles.header}>
        <Search
          searchValue={searchValue}
          onChangeText={(text: string) => handleSearch(text)}
        />
        <PrimaryButton
          hasIcon={true}
          onPress={() =>
            navigation ? navigation.navigate('AddContact') : null
          }
          customStyle={styles.addContact}
        />
      </View>
      <FlatList
        style={styles.list}
        data={filteredContacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          const {name, phone, sex, country, code, id} = item;
          return (
            <ContactItem
              name={name}
              phone={phone}
              sex={sex}
              country={country}
              code={code}
              onRightPress={() => {
                Alert.alert(
                  'Delete confirmation',
                  'Are you sure you want to delete contact?',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => {},
                      style: 'cancel',
                    },
                    {text: 'DELETE', onPress: () => handleDelete(id)},
                  ],
                  {cancelable: false},
                );
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        ListEmptyComponent={ListEmptyComponent}
      />
    </>
  );
};

export default Home;
