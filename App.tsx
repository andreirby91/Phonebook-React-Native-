import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AddNewContactModal from './src/components/AddNewContactModal';
import Home from './src/screens/Home';
// import {AppContextProvider} from './src/context/AppContext_old';
import AppStateContext from './src/context/app.context';
import {useAppState} from './src/hooks/useAppState.hooks';

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
  const appState = useAppState();
  return (
    <AppStateContext.Provider value={appState}>
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{headerShown: false}}
          />
          <RootStack.Screen
            name="AddNewContact"
            component={AddNewContactModal}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppStateContext.Provider>
  );
};

export default App;
// export default from './storybook';
