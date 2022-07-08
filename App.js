import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MyNav from './Navigation/MyNav';
import {authProvider} from './context/authContext';
import {
  LogBox,
} from 'react-native';
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <authProvider>
      <NavigationContainer>
        <MyNav />
      </NavigationContainer>
    </authProvider>
  );
};

export default App;
