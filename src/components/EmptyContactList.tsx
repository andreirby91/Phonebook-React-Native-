import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
};

const styles = StyleSheet.create({});

const EmptyContactList = ({navigation}: Props) => {
  return (
    <View>
      <Text>No contacts available!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AddNewContact')}>
        <Text>Add new contact</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyContactList;
