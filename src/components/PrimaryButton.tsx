import React from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

type Props = {
  onPress: () => void;
  title?: string;
  customStyle?: ViewStyle;
  hasIcon?: boolean;
  iconName?: string;
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
    fontSize: 18,
  },
  iconStyle: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
  },
});

const PrimaryButton: React.FC<Props> = ({
  onPress,
  title,
  customStyle,
  hasIcon,
  iconName,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, customStyle, hasIcon ? styles.iconStyle : null]}>
      {hasIcon ? (
        <FontistoIcon
          name={iconName ? iconName : 'picture'}
          style={styles.icon}
        />
      ) : null}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
