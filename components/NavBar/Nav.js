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
import { Dimensions } from "react-native";

import { MonoText } from "../../components/StyledText";

var width = Dimensions.get("window").width;

export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { navigation } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Splash")}
          style={styles.shadow}
        >
          <Image
            source={require("../../assets/images/mobileGUI/misc/home.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.shadow}
        >
          <Image
            source={require("../../assets/images/mobileGUI/misc/trainIcon.png")}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Leaderboard")}
          style={styles.shadow}
        >
          <Image
            source={require("../../assets/images/mobileGUI/misc/trophy.png")}
            style={styles.image}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.shadow}
        >
          <Image
            source={require("../../assets/images/mobileGUI/misc/userIcon2.png")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FCE1E0",
    flex: 1,
    bottom: 0,
    width: width,
    alignSelf: "stretch",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 20,
    paddingVertical: 17,
    borderTopWidth: 4,
    borderTopColor: "#FF7F7B",
    elevation: 5
  },
  image: {
    height: 55,
    width: 55
  },
  shadow: {
    shadowColor: "#FF7F7B",
    shadowOffset: { width: 3, height: 3 },
    shadowRadius: 25,
    shadowOpacity: 1,
    elevation: 2
  }
});
