import React from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Swipable from 'react-native-gesture-handler/Swipeable';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 18,
    fontSize: 18,
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 4,
  },
  text: {
    fontSize: 18,
  },
  icon: {
    fontSize: 35,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
    borderColor: 'grey',
    marginRight: 10,
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
      <View style={styles.container}>
        {sex === 'male' ? (
          <FontistoIcon name="male" style={styles.icon} />
        ) : (
          <FontistoIcon name="female" style={styles.icon} />
        )}

        <View>
          <Text numberOfLines={1} style={[styles.text, {marginBottom: 5}]}>
            {name}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {marginBottom: 5},
            ]}>{`${code} ${phone} (${country})`}</Text>
        </View>
      </View>
    </Swipable>
  );
};

export default ContactItem;
