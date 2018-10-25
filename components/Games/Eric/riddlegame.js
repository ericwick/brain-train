import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import axios from "axios";
import AppNavigator from "../../../navigation/AppNavigator";

export default class riddlegame extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Riddles Test</Text>

        <TouchableOpacity style={styles.button}>
          <Button
            onPress={() => this.props.navigation.navigate("questionOne")}
            title="START"
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3783F5",
    paddingVertical: 100
  },
  title: {
    marginTop: 40,
    fontSize: 35,
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
