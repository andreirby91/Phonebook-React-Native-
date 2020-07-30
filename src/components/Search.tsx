import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: '#fafafb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    height: 45,
    maxHeight: 45,
    flex: 1,
    borderRadius: 20,
    fontSize: 18,
  },
});

const Search = ({
  searchValue,
  onChangeText,
}: {
  searchValue: string;
  onChangeText: any;
}) => {
  return (
    <TextInput
      style={styles.input}
      value={searchValue}
      onChangeText={onChangeText}
      autoCorrect={false}
      placeholder="Search by names and numbers:"
    />
  );
};

export default Search;
