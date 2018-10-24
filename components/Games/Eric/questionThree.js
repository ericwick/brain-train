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
import Results from "./Results";

import AppNavigator from "../../../navigation/AppNavigator";
// import { Button } from "react-native-elements";

// import { MonoText } from "../StyledText";

export default class questionThree extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      time: [],
      right: 0,
      wrong: 0
    };
  }
  static navigationOptions = {
    header: null
  };

  handleWrongAnswer() {
    console.warn("INCORRECT. TRY AGAIN.");
    this.setState({
      wrong: (this.state.wrong += 1)
    });
  }

  handleRightAnswer() {
    console.warn("CORRECT!!!");
    this.setState({
      right: (this.state.right += 1)
    });
  }

  toggleResults() {
    this.setState({
      results: !this.state.results
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Riddles Test</Text>

        <Text style={styles.number}>Question 3</Text>
        <Text style={styles.question}>What has hands but can not clap?</Text>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.handleWrongAnswer()}
            title="A. A guy with two broken arms"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button onPress={() => this.handleRightAnswer()} title="B. A clock" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button onPress={() => this.handleWrongAnswer()} title="C. Cards" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.handleWrongAnswer()}
            title="D. A bodybuilder"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.props.navigation.navigate("questionFour")}
            title="NEXT"
          />
        </TouchableOpacity>
        <Results
          questionThreeRight={this.state.right}
          questionThreeWrong={this.state.wrong}
        />
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
  space: {
    marginVertical: 30
  },
  question: {
    fontSize: 12
  },
  button: {
    width: 200,
    height: 30,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 20
  }
});
