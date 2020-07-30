import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddNewContactModal from './src/components/AddNewContactModal';
import Home from './src/screens/Home';
import AppStateContext from './src/context/app.context';
import {useAppState} from './src/hooks/useAppState.hook';

export type MainStackParamList = {
  Phonebook: undefined;
};

export type RootStackParamList = {
  Phonebook: undefined;
  AddContact: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Phonebook" component={Home} />
    </MainStack.Navigator>
  );
};

const App = () => {
  const appState = useAppState();

  return (
    <AppStateContext.Provider value={appState}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Phonebook"
            component={MainStackScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="AddContact"
            component={AddNewContactModal}
            options={{title: 'Add contact'}}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppStateContext.Provider>
  );
};

export default App;
// export default from './storybook';
