import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';

type Props = {
  onPress: () => void;
  title: string;
  customStyle?: ViewStyle;
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    minWidth: 200,
    backgroundColor: '#0984e3',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

const PrimaryButton: React.FC<Props> = ({onPress, title, customStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, customStyle]}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
