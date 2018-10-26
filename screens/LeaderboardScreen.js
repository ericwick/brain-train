import React from "react";
import {
  ImageBackground,
  Platform,
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
    marginTop: 60,
    marginBottom: 20,
    color: "#FC9902",
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 2.8,
    fontWeight: "bold"
  },
  leaderboardTitle: {
    fontSize: 25,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 40,
    color: "#0FB801",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1.2 },
    textShadowRadius: 2.2,
    fontWeight: "bold"
  }
});
