import React from "react";
import {
  ImageBackground,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { ExpoLinksView } from "@expo/samples";
import LeaderboardTable from "../components/LeaderboardTable/LeaderboardTable";
import AppNavigator from "../navigation/AppNavigator";
import Nav from "../components/NavBar/Nav";

const { width, height } = Dimensions.get("window");

export default class LeaderboardScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let { navigation } = this.props;
    // console.warn(this.state.users);
    return (
      <ImageBackground
        source={require("../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}> LEADERBOARD </Text>

          <Text style={styles.leaderboardTitle}>Global Leaderboard</Text>
          <LeaderboardTable stats={this.state} />
        </ScrollView>
        <Nav navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 120
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 100
  },
  title: {
    fontSize: 45,
    textAlign: "center",
    marginTop: width * 0.3,
    marginBottom: width * 0.04,
    fontFamily: "CarterOne",
    color: "white",
    letterSpacing: 1,
    textShadowColor: "black",
    textShadowRadius: 5,
    textShadowOffset: { width: -2, height: 2 }
  },
  leaderboardTitle: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 40,
    fontFamily: "CarterOne",
    color: "white",
    letterSpacing: 1,
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  }
});
