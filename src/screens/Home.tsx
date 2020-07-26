import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
};

interface State {
  enthusiasmLevel: number;
}

const Home = ({navigation}: Props) => {
  return (
    <View>
      <Text>Hello World!</Text>

      <TouchableOpacity onPress={() => navigation.navigate('AddNewContact')}>
        <Text>Add a new contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Home;
