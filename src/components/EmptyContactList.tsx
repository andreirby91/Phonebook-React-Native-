import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PrimaryButton from './PrimaryButton';

type Props = {
  onPress: () => void;
};

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});

const EmptyContactList = ({onPress}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No contacts available!</Text>
      <PrimaryButton title="Add new contact" onPress={onPress} />
    </View>
  );
};

export default EmptyContactList;
