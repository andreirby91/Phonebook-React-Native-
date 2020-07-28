import React from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Swipable from 'react-native-gesture-handler/Swipeable';

type Props = {
  name: string;
  phone: string;
  sex: string;
  country: string;
  code: string;
  onRightPress: () => void;
};

type RightActions = {
  progress: any;
  dragX: any;
  onPress: () => void;
};

const styles = StyleSheet.create({
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});

const ContactItem: React.FC<Props> = ({
  name,
  phone,
  sex,
  country,
  code,
  onRightPress,
}) => {
  const RightActions = ({progress, dragX, onPress}: RightActions) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.rightAction}>
          <Animated.Text style={[styles.actionText, {transform: [{scale}]}]}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipable
      renderRightActions={(progress, dragX) => (
        <RightActions
          progress={progress}
          dragX={dragX}
          onPress={onRightPress}
        />
      )}>
      <View>
        <Text>{name}</Text>
        <Text>Sex: {sex}</Text>
        <Text>{`${code} ${phone} (${country})`}</Text>
      </View>
    </Swipable>
  );
};

export default ContactItem;
