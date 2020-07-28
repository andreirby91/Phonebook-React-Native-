import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../App';

type Props = {
  onPress: () => void;
};

const styles = StyleSheet.create({});

const EmptyContactList = ({onPress}: Props) => {
  return (
    <View>
      <Text>No contacts available!</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>Add new contact</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyContactList;
