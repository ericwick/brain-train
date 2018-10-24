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
import axios from "axios";
import AppNavigator from "../navigation/AppNavigator";
import { Button } from "react-native-elements";
// import { connect } from "react-redux";
// import { getUsers } from "../redux/reducer";

import { MonoText } from "../components/StyledText";

class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      time: []
    };
  }
  static navigationOptions = {
    header: null
  };

  // componentDidMount() {
  //   this.props.getUsers();
  // }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />

          <TouchableOpacity
            style={styles.content}
            onPress={() => this.props.navigation.navigate("Login")}
            activeOpacity={0.82}
          >
            <ImageBackground
              source={require("../assets/images/mobileGUI/coloredButtons/1_easy.png")}
              style={styles.button}
            >
              <Text style={styles.play}>PLAY</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.content}
            onPress={() => this.props.navigation.navigate("Login")}
            activeOpacity={0.82}
          >
            <ImageBackground
              source={require("../assets/images/mobileGUI/coloredButtons/2_med.png")}
              style={styles.settingsButton}
            >
              <Text style={styles.settings}>SETTINGS</Text>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.content}
            onPress={() => this.props.navigation.navigate("Login")}
            activeOpacity={0.82}
          >
            <ImageBackground
              source={require("../assets/images/mobileGUI/coloredButtons/3_hard.png")}
              style={styles.aboutButton}
            >
              <Text style={styles.about}>ABOUT</Text>
            </ImageBackground>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  play: {
    color: "white",
    fontSize: 35,
    fontWeight: "bold",
    letterSpacing: 1,
    textShadowColor: "#69AB38",
    textShadowOffset: { width: -3, height: 6 },
    textShadowRadius: 6
  },
  image: {
    resizeMode: "contain",
    width: 370,
    height: 250,
    transform: [{ rotate: "-2deg" }],
    marginRight: 12,
    marginTop: 80,
    marginBottom: 40
  },
  contentContainer: {
    flex: 1,
    alignItems: "center"
  },
  content: {
    alignItems: "center"
  },
  button: {
    width: 300,
    height: 95,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
  settingsButton: {
    width: 200,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50
  },
  aboutButton: {
    width: 200,
    height: 62,
    justifyContent: "center",
    alignItems: "center"
  },
  settings: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "#D89F07",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 6
  },
  about: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "#A90E1A",
    textShadowOffset: { width: -3, height: 3 },
    textShadowRadius: 6
  }
});

export default SplashScreen;

// const mapStateToProps = state => state;
// export default connect(
//   mapStateToProps,
//   { getUsers }
// )(SplashScreen);
