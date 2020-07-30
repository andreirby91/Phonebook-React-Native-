import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import PrimaryButton from './PrimaryButton';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

type Props = {
  onPress: () => void;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
  icon: {
    fontSize: 70,
    marginBottom: 30,
  },
});

const EmptyContactList = ({onPress}: Props) => {
  return (
    <View style={styles.container}>
      <FontistoIcon name="persons" style={styles.icon} />
      <Text style={styles.text}>No contacts available!</Text>
      <PrimaryButton title="Add new contact" onPress={onPress} />
    </View>
  );
};

export default EmptyContactList;
