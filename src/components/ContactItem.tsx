import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ContactItem = () => {
  return (
    <View>
      <View style={styles.icon}></View>
      <View>
        <Text>Name</Text>
        <Text>+40 763 654 814</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },
});

export default ContactItem;
