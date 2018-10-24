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
import { Button } from "react-native-elements";
import axios from "axios";
import AppNavigator from "../../../navigation/AppNavigator";
import Nav from "../../NavBar/Nav";

export default class TapNumber extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/mobileGUI/sky_bg.png")}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Tap Number</Text>

          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("TapNumberGame")}
              title="START"
              buttonStyle={styles.button}
            />
          </TouchableOpacity>
        </ScrollView>
        <Nav navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100
  },
  title: {
    marginTop: 40,
    fontSize: 55,
    color: "black",
    textAlign: "center"
  },
  button: {
    width: 250,
    height: 100,
    borderRadius: 3,
    borderWidth: 1,
    marginVertical: 20,
    borderColor: "black"
  }
});
