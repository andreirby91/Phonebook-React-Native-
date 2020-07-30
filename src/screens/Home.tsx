import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import ContactItem from '../components/ContactItem';
import Search from '../components/Search';
import EmptyContactList from '../components/EmptyContactList';
import AppStateContext from '../context/app.context';
import PrimaryButton from '../components/PrimaryButton';

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
    alignItems: 'center',
    paddingTop: 20,
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
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
        <Text>No contacts found!</Text>
      </View>
    ) : (
      <EmptyContactList onPress={() => navigation.navigate('AddNewContact')} />
    );
  };

  return (
    <>
      <View style={styles.header}>
        <PrimaryButton
          title="Add new contact"
          onPress={() =>
            navigation ? navigation.navigate('AddNewContact') : null
          }
        />
        <Search
          searchValue={searchValue}
          onChangeText={(text: string) => handleSearch(text)}
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
              onRightPress={() => handleDelete(id)}
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
