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

import { MonoText } from "./components/StyledText";

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <Button
          onPress={() => this.props.navigation.navigate("Landing")}
          title="Landing"
        />
        <Button
          onPress={() => this.props.navigation.navigate("Home")}
          title="Home"
        />

        <Button
          onPress={() => this.props.navigation.navigate("Login")}
          title="Login"
        />

        <Button
          onPress={() => this.props.navigation.navigate("Home")}
          title="Profile (notsetupyet)"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    flexDirection: row,
    position: absolute,
    bottom: 0
  }
});
