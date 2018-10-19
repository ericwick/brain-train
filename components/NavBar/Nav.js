import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../../navigation/AppNavigator";
import { Button } from "react-native-elements";

import { MonoText } from "../../components/StyledText";

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Splash")}>
          <Image
            source={require("../../assets/images/home.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            source={require("../../assets/images/trainIcon.png")}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Leaderboard")}>
          <Image
            source={require("../../assets/images/trophy.png")}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={require("../../assets/images/userIcon2.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9CD3DE",
    flex: 1,
    bottom: 0,
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 17,
    paddingLeft: 30
  },
  button: {
    padding: 0,
    margin: 0,
    backgroundColor: "transparent"
  },
  image: {
    backgroundColor: "transparent",
    height: 55,
    width: 55,
    marginRight: 45
  }
});
