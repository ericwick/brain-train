import React from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import LandingScreen from "../screens/LandingScreen";
import Nav from "../components/NavBar/Nav";
import ProfileScreen from "../screens/ProfileScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import LeaderboardsScreen from '../screens/LeaderboardsScreen';
import editProfile from '../components/Profiles/editProfile';


export default (AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: LoginScreen },
  Landing: { screen: LandingScreen },
  NavBar: { screen: Nav },
  Profile: { screen: ProfileScreen },
  Leaderboard: { screen: LeaderboardScreen },
  Leadboards:{screen: LeaderboardsScreen},
  editProfile:{screen: editProfile }
}));
