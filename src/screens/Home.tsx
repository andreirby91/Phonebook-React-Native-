import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import ContactItem from '../components/ContactItem';
import Search from '../components/Search';
import EmptyContactList from '../components/EmptyContactList';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
};

type Contact = {
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

const Home = ({navigation}: Props) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const CONTACTS: Array<Contact> = [
    {
      id: 1,
      name: 'John Doe',
      phone: '763000000',
      sex: 'Male',
      country: 'Romania',
      code: '+40',
    },
    {
      id: 2,
      name: 'Johana Doe',
      phone: '763000001',
      sex: 'Female',
      country: 'Romania',
      code: '+40',
    },
  ];

  useEffect(() => {
    handleContactUpdates(CONTACTS);
  }, []);

  const handleFilteringByType = (input: string) => {
    let isNumRegex = /^[0-9]+$/;
    const filterBy = isNumRegex.test(input) ? 'phone' : 'name';
    const filteredItems = contacts.filter((contact: Contact) =>
      contact[filterBy].toLowerCase().includes(input.toLowerCase()),
    );

    return filteredItems;
  };

  const handleSearch = (text: any) => {
    setSearchValue(text);
    setFilteredContacts(handleFilteringByType(text));
  };

  const handleContactUpdates = (contacts: Contact[]) => {
    setContacts(contacts);
    setFilteredContacts(contacts);
  };

  const handleDelete = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    handleContactUpdates(updatedContacts);
  };

  const ListEmptyComponent = () => {
    return contacts.length ? (
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
        <TouchableOpacity onPress={() => navigation.navigate('AddNewContact')}>
          <Text>Add new contact</Text>
        </TouchableOpacity>
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
