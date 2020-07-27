import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ContactItem = ({name, phone, sex, country, code}) => {
  return (
    <View style={styles.container}>
      <Text>{name}</Text>
      <Text>Sex: {sex}</Text>
      <Text>{`${country} ${code} ${phone}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ContactItem;
