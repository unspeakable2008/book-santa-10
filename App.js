import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from "./screens/WelcomeScreen"
import {AppTabNavigator} from "./components/AppTabNavigator"
import {createAppContainer,createSwitchNavigator} from "react-navigation"
import {AppDrawNavigator} from "./components/AppDrawNavigator"
export default function App() {
  return (
   <AppContainer></AppContainer>
  );
}
const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen:WelcomeScreen},
  Drawer:{screen:AppDrawNavigator}
})
const AppContainer = createAppContainer(switchNavigator)
