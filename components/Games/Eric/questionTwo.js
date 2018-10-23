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

export default class questionTwo extends Component {
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

        <Text style={styles.number}> Question 2</Text>
        <Text style={styles.question}>
          Throw away the outside and cook the inside, then eat the outside and
          throw away the inside. What is it?
        </Text>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.handleWrongAnswer()}
            title="A. Blow-pop"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button onPress={() => this.handleWrongAnswer()} title="B. Popcorn" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button onPress={() => this.handleRightAnswer()} title="C. Corn" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.handleWrongAnswer()}
            title="D. Pineapple"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.props.navigation.navigate("questionThree")}
            title="NEXT"
          />
        </TouchableOpacity>
        <Results
          questionTwoRight={this.state.right}
          questionTwoWrong={this.state.wrong}
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
  question: {
    fontSize: 12
  },
  space: {
    marginVertical: 30
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
