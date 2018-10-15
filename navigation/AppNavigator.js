import React from "react";
import { createStackNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import LandingScreen from "../screens/LandingScreen";

const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Landing: { screen: LandingScreen }
});

export default AppNavigator;
