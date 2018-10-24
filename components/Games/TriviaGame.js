import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../../navigation/AppNavigator";
import { Button } from "react-native-elements";

import { connect } from "react-redux";
import { getTrivia } from "../../redux/reducer";
import { MonoText } from "../StyledText";
import BUTTON_BACK from "../../assets/images/mobileGUI/functionButtons/sm_btn_left.png";
import MESSAGE_GREY from "../../assets/images/mobileGUI/coloredButtons/button_gry.png";
import MESSAGE_RED from "../../assets/images/mobileGUI/coloredButtons/button_red.png";
import MESSAGE_BLUE from "../../assets/images/mobileGUI/coloredButtons/button_blu.png";
import MESSAGE_GREEN from "../../assets/images/mobileGUI/coloredButtons/button_grn.png";
import MESSAGE_YELLOW from "../../assets/images/mobileGUI/coloredButtons/button_ylw.png";

const { width, height } = Dimensions.get("window");
const GAME_WIDTH = width - 10;
const CARD_HEIGHT = 100;

class TriviaGame extends Component {
  constructor() {
    super();
    this.state = {
      score: 50,
      data: [],
      time: [],
      animateModal: new Animated.Value(0),
      cardIndex: 0
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.props.getTrivia("", 10, 1);
  }

  //longest question:         "'In 1967, a magazine published a story about extracting hallucinogenic chemicals from bananas to raise moral questions about banning drugs.'"
  //longest correct answer:   "'A Fistful of Dollars', 'For a Few Dollars More', 'The Good, the Bad, and the Ugly'"
  //longest incorrect answer: "'You used to be so warm and affectionate...but now you're quick to get into your regret'"

  shuffle(arr) {
    var j, x, i;
    for (i = arr.length; i > 0; i--) {
      j = Math.floor(Math.random() * i);
      x = arr[i - 1];
      arr[i - 1] = arr[j];
      arr[j] = x;
    }
  }

  printScore(int, length=4){
    // Get absolute value to account for negatives
    absint = Math.abs(int);
    // Round down, convert to string, take length, and subtract from desired zeroes. Return if greater than 0
    let neededZeros = Math.max(0, length - Math.floor(absint).toString().length);
    // Create a number with the required number of zeroes, convert it to a string, and split off the first digit
    let zeroString = Math.pow(10, neededZeros).toString().substr(1);
    if(int < 0) {
      zeroString = '-' + zeroString;
    }
    return (
      <View>
        <Text style={[styles.emphasisText,{ marginLeft: 5 }]}>{zeroString + int}</Text>
      </View>
    );
  }

  initializeCards() {
    let answerArr = [];
    let i = this.state.cardIndex;
    if (this.props.trivia.length) {
      answerArr = this.props.trivia[i].incorrect_answers.map(e => {
        return {
          // Removes quotes from the outside of each string
          answer: e.replace(/^['"]+(.*)['"]+/g, "$1"),
          isCorrect: false
        };
      });
      answerArr.push({
        answer: this.props.trivia[i].correct_answer,
        isCorrect: true
      });
      this.shuffle(answerArr);
      // console.log(answerArr);
    }
    return answerArr;
  }

  getTopBar(){
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 30, maxHeight: 70}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}>
            <Image source={BUTTON_BACK}/>
          </TouchableOpacity>
          <Text style={[styles.emphasisText,{ marginLeft: 5 }]}>BACK</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={[styles.emphasisText,{ marginRight: 10 }]}>{this.state.cardIndex+1}/{this.props.trivia.length}</Text>
          {this.printScore(this.state.score)}
        </View>
      </View>
    );
  }

  userAnsweredQuestion(selectedIndex, questionArray){
    let currentquestion = this.state.cardIndex+1;
    let questionsTotal = this.props.trivia.length;
    let { score } = this.state;
    console.log(questionArray);
    if(questionArray[selectedIndex].isCorrect) {
      this.setState({score: score+50});
    }
    questionsTotal > currentquestion ? this.setState({cardIndex: currentquestion}) : console.log('Reached end of questions');
  }

  render() {
    const cardBgArr = [
      MESSAGE_RED,
      MESSAGE_BLUE,
      MESSAGE_YELLOW,
      MESSAGE_GREEN
    ];
    let cards = this.initializeCards();
    let { cardIndex } = this.state;

    return (
      <ImageBackground
        source={require("../../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {this.getTopBar()}
          <ImageBackground
            source={MESSAGE_GREY}
            style={[styles.flashCard, { width: GAME_WIDTH, maxHeight: CARD_HEIGHT }]}
          >
            <Text style={styles.bodyText}>
              {this.props.trivia.length
                ? this.props.trivia[cardIndex].question
                : "Loading... Please wait"}
            </Text>
          </ImageBackground>
          {cards.map((e, i, s) => {
            return (
              <TouchableOpacity
                focusedOpacity={0.7}
                activeOpacity={0.7}
                style={[styles.cell]}
                key={"answerCard" + i}
                onPress={() => this.userAnsweredQuestion(i, s)}
              >
                <ImageBackground
                  source={cardBgArr[i]}
                  style={[styles.flashCard, { width: GAME_WIDTH }]}
                  key={"card" + i}
                >
                  <Text style={styles.bodyText}>{cards[i].answer}</Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  emphasisText: {
    fontFamily: 'CarterOne',
    color: 'white',
    fontSize: 30,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 20
  },
  cell: {
    flex: 1,
    height: CARD_HEIGHT
  },
  flashCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: CARD_HEIGHT,
    marginBottom: 20
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  bodyText: {
    marginTop: 10,
    fontSize: 15,
    color: "black",
    textAlign: "center"
  }
});

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { getTrivia }
)(TriviaGame);