import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';
import ContactItem from '../components/ContactItem';
import Search from '../components/Search';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
};

interface State {
  enthusiasmLevel: number;
}

const CONTACTS = [
  {
    name: 'John Doe',
    phone: '763000000',
    sex: 'Male',
    country: 'Romania',
    code: '+40',
  },
  {
    name: 'Johana Doe',
    phone: '763000001',
    sex: 'Female',
    country: 'Romania',
    code: '+40',
  },
];

const Home = ({navigation}: Props) => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('AddNewContact')}>
          <Text>Add new contact</Text>
        </TouchableOpacity>
        <Search searchValue onChangeText={() => setSearchValue(searchValue)} />
      </View>
      <FlatList
        style={styles.list}
        data={CONTACTS}
        keyExtractor={(item) => item.phone}
        renderItem={({item}) => {
          const {name, phone, sex, country, code} = item;
          return (
            <ContactItem
              name={name}
              phone={phone}
              sex={sex}
              country={country}
              code={code}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
  },
});

export default Home;
