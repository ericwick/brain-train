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
import AppNavigator from "../navigation/AppNavigator";
import { Button } from "react-native-elements";

import { MonoText } from "../components/StyledText";

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/cloud-background.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.getStartedText}>Brain Train</Text>

          <Button
            onPress={() => this.props.navigation.navigate("Login")}
            title="PLAY"
            buttonStyle={{
              backgroundColor: "#06439E",
              width: 200,
              height: 50,
              marginTop: 50,
              marginLeft: 70,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5
            }}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  login: {
    height: 25,
    width: 75,
    marginVertical: 300,
    marginHorizontal: 150,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "white"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 450,
    height: 280,
    resizeMode: "contain",
    marginTop: 30,
    marginBottom: 15,
    marginLeft: -10
  },
  getStartedText: {
    marginTop: 200,
    fontSize: 47,
    color: "black",
    textAlign: "center"
  }
});
