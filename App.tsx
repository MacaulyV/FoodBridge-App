import 'react-native-gesture-handler';  // Isso deve ser a primeira importação
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'; 
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
    <AppNavigator />
    </NavigationContainer>
  );
}
