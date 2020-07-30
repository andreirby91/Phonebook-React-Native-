import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 0.5,
    borderColor: 'grey',
    backgroundColor: '#fafafb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    width: 345,
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

export default Search;
