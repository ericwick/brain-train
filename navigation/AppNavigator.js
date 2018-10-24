import React from "react";
import { createStackNavigator } from "react-navigation";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import Nav from "../components/NavBar/Nav";
import ProfileScreen from "../screens/ProfileScreen";
import LeaderboardScreen from "../screens/LeaderboardScreen";
import LeaderboardsScreen from "../screens/LeaderboardsScreen";
import EditProfile from "../components/Profiles/EditProfile";
import Aftab from "../components/Games/Aftab";
import Eric from "../components/Games/Eric";
import TriviaGame from "../components/Games/TriviaGame";
import UserStats from '../components/Profiles/UserStats';
import game from '../components/Games/Tile_Tap/game';
// import sequent from '../components/Games/src2/sequent';

export default (AppNavigator = createStackNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Home: { screen: HomeScreen },
  NavBar: { screen: Nav },
  EditProfile: { screen: EditProfile },
  Profile: { screen: ProfileScreen },
  Leaderboard: { screen: LeaderboardScreen },
  Leadboards: { screen: LeaderboardsScreen },
  Eric: { screen: Eric },
  Aftab: { screen: Aftab },
  TriviaGame: { screen: TriviaGame }, 
  UserStats: {screen: UserStats}, 
  TileGame: {screen: game },
  // Sequent: {screen: sequent}
}));
