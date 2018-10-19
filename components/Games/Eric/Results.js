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
// import { Button } from "react-native-elements";

// import { MonoText } from "../StyledText";

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data: [],
      // time: [],
      // right: 0,
      // wrong: 0
    };
  }
  static navigationOptions = {
    header: null
  };

  render() {
    let {
      questionOneRight,
      questionOneWrong,
      questionTwoRight,
      questionTwoWrong,
      questionThreeRight,
      questionThreeWrong,
      questionFourRight,
      questionFourWrong
    } = this.props;

    let totalRight =
      questionOneRight +
      questionTwoRight +
      questionThreeRight +
      questionFourRight;
    let totalWrong =
      questionOneWrong +
      questionTwoWrong +
      questionThreeWrong +
      questionFourWrong;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Riddles Test</Text>
        <Text style={styles.title}>RESULTS</Text>

        <Text style={styles.number}>Number Correct:</Text>
        <Text style={styles.question}>{totalRight}</Text>

        <Text style={styles.number}>Number Incorrect:</Text>
        <Text style={styles.question}>{totalWrong}</Text>

        <TouchableOpacity style={styles.button}>
          <Button
            onPress={() => this.props.navigation.navigate("Profile")}
            title="FINISH"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Button
            onPress={() => this.props.navigation.navigate("Eric")}
            title="Try Again"
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
  number: {
    fontSize: 10
  },
  question: {
    fontSize: 12
  },
  button: {
    width: 250,
    height: 100,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 20
  }
});
