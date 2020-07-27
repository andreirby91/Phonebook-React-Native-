import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Search = ({searchValue, onChangeText}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={searchValue}
        onChangeText={onChangeText}
        placeholder="Search by names and numbers:"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fafafb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    width: 300,
    borderRadius: 20,
    fontSize: 18,
  },
});

export default Search;
