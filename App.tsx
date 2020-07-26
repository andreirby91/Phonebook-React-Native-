import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddNewContactModal from './src/components/AddNewContactModal';
import Home from './src/screens/Home';

export type MainStackParamList = {
  Home: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  AddNewContact: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="AddNewContact" component={AddNewContactModal} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// export default from './storybook';
