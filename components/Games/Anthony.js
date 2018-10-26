import React, { Component } from 'react';
import Exponent, { Components, Font, Asset  } from 'expo';
import AppNavigator from "../../navigation/AppNavigator";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  ImageBackground,
  LayoutAnimation     //
} from 'react-native';
import CountdownTimer from './Timer';

const TIME_LIMIT = 9000;
const { width } = Dimensions.get("window");
const TIME_BAR_HEIGHT = 20;

export default class TapTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRemaining: 20 * 1000,
      finished: false,
      animateValue: new Animated.Value(0)
    }
  }

  componentDidMount(){
    this.startGame();
    console.log(this.props);
  }

  handleDelay = () => {
    return setTimeout(function() {
      this.props.navigation.navigate("Home");
    }, TIME_LIMIT);
  };

  startGame() {
    this.setState({ level: 1, score: 0, isGameRunning: true });
    this.startTimer();
  }

  async startTimer() {
    await this.handleDelay(TIME_LIMIT);
  }

  render() {
    const {
      timeRemaining,
      finished,
      gameStarted
    } = this.state;

    const timerBackgroundColor = this.state.animateValue.interpolate({
      inputRange: [0, TIME_LIMIT * 0.4, TIME_LIMIT],
      outputRange: ["red", "blue", "green"]
    });
    
    const width = this.state.animateValue.interpolate({
      inputRange: [0, TIME_LIMIT],
      outputRange: [0, width]
    });

    return (
      <View style={styles.conatiner}>
        <View style={[styles.content, { width, timerBackgroundColor }]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40
  },
  cellText: {
    fontSize: 12,
    color: 'white'
  },
  cellContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  row: {
    flexDirection: 'row'
  },

  topContent: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadow: {
    fontSize: 12,
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowOpacity: 0.35,
    shadowRadius: 0,
    backgroundColor: 'transparent'
  },
  shadowSmall: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '900',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2.5
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    backgroundColor: 'transparent'
  },
  small: {
    fontSize: 12
  }
});