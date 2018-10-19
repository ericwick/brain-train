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
import Results from "./Results";
// import { Button } from "react-native-elements";

export default class questionOne extends Component {
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

        <Text style={styles.number}>Question 1</Text>
        <Text style={styles.question}>
          There is a dead man in the middle of a field, nothing is around him
          and there are no footprints of any sort. There is an unopened package
          next to him. How did he die? HINT: As he approached the field he knew
          he was going to die.
        </Text>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.handleRightAnswer()}
            title="A. He's a parachuter who came in too hot"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.handleWrongAnswer()}
            title="B. He's a teleporting mailman"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.handleWrongAnswer()}
            title="C. It just rained and the footprints washed away"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.handleWrongAnswer()}
            title="D. He can fly but crashed"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.space}>
          <Button
            onPress={() => this.props.navigation.navigate("questionTwo")}
            title="NEXT"
          />
        </TouchableOpacity>
        <Results
          questionOneRight={this.state.right}
          questionOneWrong={this.state.wrong}
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
