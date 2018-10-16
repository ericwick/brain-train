// import React from "react";
// import { createStackNavigator } from "react-navigation";
// import LoginScreen from "../screens/LoginScreen";
// import HomeScreen from "../screens/HomeScreen";
// import LandingScreen from "../screens/LandingScreen";
// import MainTabNavigator from './MainTabNavigator';

// const AppNavigator = createStackNavigator({
//   Home: { screen: HomeScreen },
//   Login: { screen: LoginScreen },
//   Landing: { screen: LandingScreen },

// });

// export default AppNavigator;



import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});