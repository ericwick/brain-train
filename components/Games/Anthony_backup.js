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
import { connect } from "react-redux";
import { getTrivia } from "../../redux/reducer";


import { MonoText } from "../StyledText";

class Anthony extends Component {
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

  componentDidMount() {
    this.props.getTrivia('General', 1, 2);
  }

  //longest question:         "'In 1967, a magazine published a story about extracting hallucinogenic chemicals from bananas to raise moral questions about banning drugs.'"
  //longest correct answer:   "'A Fistful of Dollars', 'For a Few Dollars More', 'The Good, the Bad, and the Ugly'"
  //longest incorrect answer: "'You used to be so warm and affectionate...but now you're quick to get into your regret'"

  render() {
    return (
      <ImageBackground
        source={require("../../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.bodyText}>{this.props.trivia.map(e => e.question)}</Text>
          <Text style={styles.bodyText}>{this.props.trivia.map(e => e.correct_answer)}</Text>
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
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "white"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    color: "black",
    textAlign: "center"
  },
  bodyText: {
    marginTop: 10,
    fontSize: 15,
    color: "black",
    textAlign: "center"
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getTrivia })(Anthony);