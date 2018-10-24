import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Dimensions,
  Animated,
  Easing
} from "react-native";
import { WebBrowser } from "expo";
import { View } from "react-native-animatable";
import { Button } from "react-native-elements";
import { inRange, random, filter, find, orderBy, times } from "lodash";
import axios from "axios";
import AppNavigator from "../../../navigation/AppNavigator";
import Nav from "../../NavBar/Nav";
import uuid from "uuid";

const ANDROID = Platform.OS === "android";
const { height, width } = Dimensions.get("window");

const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = ANDROID ? height - 24 : height;

const TIME_BAR_HEIGHT = DEVICE_HEIGHT * 0.02;
const TIME_LIMIT = 9000;

const TILE_SIZE = DEVICE_WIDTH * 0.28;
const TILE_SHADOW_DEPTH = 6;
const TILE_BORDER_RADIUS = TILE_SIZE * 0.1;

const BOARD_MARGIN = 20;
const BOARD_HEIGHT = DEVICE_HEIGHT * 0.96;
const BOARD_WIDTH = DEVICE_WIDTH;

export default class TapNumberGame extends Component {
  constructor() {
    super();
    this.state = {
      board: [],
      tiles: [],
      blacklist: [],
      isGameRunning: false,
      isBoardValid: false,
      score: 0,
      timeLeft: 0,
      isTouched: false,
      hasBeenPressed: false,
      depth: TILE_SHADOW_DEPTH,
      borderRadius: TILE_BORDER_RADIUS,
      backgroundColor: "red",
      text: "1",
      isEnabled: true,
      singlePressOnly: true,
      onPressIn: () => any,
      onPressOut: () => any,
      animateValue: new Animated.Value(TIME_LIMIT),
      buttonColor: "green",
      hasPressedButton: false
    };
    this.handleUnSelect = this.handleUnSelect.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.startGame();
    Animated.timing(this.state.animateValue, {
      duration: TIME_LIMIT,
      easing: Easing.linear,
      toValue: 0
    }).start();
  }

  //   componentDidUpdate() {
  //     if (!this.state.isGameRunning) {
  //       this.props.navigation.navigate("Eric");
  //     } else if (!this.state.isBoardValid) {
  //       console.warn("BOARD ERROR");
  //       this.props.navigation.navigate("Eric");
  //     }
  //   }

  tileRef = null;
  boardRef = null;
  containerRef = null;

  getContainerRef = () => this.containerRef;

  startGame() {
    this.setState({ level: 1, score: 0, isGameRunning: true });
    this.buildBoard();
    this.startTimer();
  }

  nextLevel() {
    this.setState({ level: this.state.level++ });
    this.buildBoard();
  }

  isBoardEmpty() {
    return (
      this.state.tiles.slice().filter(tile => tile.isVisible === true)
        .length === 0
    );
  }

  buildBoard = () => {
    let tiles = [];
    this.setState({ isBoardValid: true });
    const numberOfTiles = this.getNumberOfTiles(this.state.level);
    const previousNumbers = [];
    times(numberOfTiles, num => {
      const id = uuid.v4();
      const { x, y } = this.getRandomTilePosition(tiles);
      const number = this.getRandomNumber(this.state.level, previousNumbers);
      const isVisible = true;
      previousNumbers.push(number);
      tiles.push({ id, x, y, number, isVisible });
    });
    this.setState({
      board: tiles
    });
  };

  async startTimer() {
    await this.handleDelay(TIME_LIMIT);
  }

  handleTilePress = async tileId => {
    const pressedTile = find(this.state.tiles, { id: tileId });
    const activeTiles = filter(this.state.tiles, "isVisible");
    const sortedActiveTiles = orderBy(activeTiles, "number");
    if (pressedTile.number === sortedActiveTiles[0].number) {
      pressedTile.isVisible = false;
      score++;
      if (this.state.isBoardEmpty) {
        this.nextLevel();
      }
    } else {
      isBoardValid = false;
      await this.handleDelay(TIME_LIMIT);
      this.buildBoard();
    }
  };

  handleSelect = () => {
    const {
      isEnabled,
      singlePressOnly,
      onPressIn,
      hasBeenPressed
    } = this.state;
    if (!isEnabled) return;
    if (singlePressOnly && hasBeenPressed) return;
    LayoutAnimation.spring();
    this.setState({
      isTouched: true
    });
    if (onPressIn) {
      onPressIn();
    }
    return true;
  };

  async handleUnSelect() {
    this.handleTilePress();
    if (this.tileRef && this.tileRef.getContainerRef()) {
      await this.tileRef.getContainerRef().bounceOut(200);
    }
    this.setState({ isVisible: false });
  }

  handleRestartPress = async () => {
    this.setState({ hasPressedButton: true });
    await this.containerRef.zoomOut();
    this.props.navigation.navigate("Eric");
  };

  getRandomNumber = () => {
    let { level } = this.state;
    var randomNumber = 0;
    if (level === 1) {
      randomNumber = random(0, 49);
    } else if (level <= 3) {
      randomNumber = random(-9, 39);
    } else if (level <= 5) {
      randomNumber = random(-29, 49);
    } else if (level > 6) {
      randomNumber = random(-69, 99);
    }
    return this.state.blacklist.includes(randomNumber)
      ? this.getRandomNumber()
      : randomNumber;
  };

  getNumberOfTiles = (level, number) => {
    const minNumberOfTiles = 3;
    const maximumNumberOfTiles = 7;
    const incrementFactor = this.state.level * 0.2;
    const numberOfTiles = Math.floor(minNumberOfTiles + incrementFactor);
    return numberOfTiles < maximumNumberOfTiles
      ? numberOfTiles
      : maximumNumberOfTiles;
  };

  getRandomTilePosition = (board, x, y) => {
    const position = {};
    const boardOriginX = BOARD_MARGIN;
    const boardOriginY = BOARD_MARGIN;
    const boardWidth = BOARD_WIDTH - BOARD_MARGIN;
    const boardHeight = BOARD_HEIGHT - BOARD_MARGIN;
    while (true) {
      const randomX = random(boardOriginX, boardWidth - TILE_SIZE);
      const randomY = random(boardOriginY, boardHeight - TILE_SIZE);
      if (this.isPositionAvailable(randomX, randomY, board)) {
        position.x = randomX;
        position.y = randomY;
        break;
      }
    }
    return position;
  };

  isPositionAvailable = (x, y, board) => {
    for (const boardTile of board) {
      if (this.doPositionsOverlap(x, y, boardTile.x, boardTile.y)) {
        return false;
      }
    }
    return true;
  };

  doPositionsOverlap = (x1, y1, x2, y2) => {
    const tileSize = TILE_SIZE + TILE_SHADOW_DEPTH;
    const xOverlap =
      inRange(x1, x2, x2 + tileSize) || inRange(x2, x1, x1 + tileSize);
    const yOverlap =
      inRange(y1, y2, y2 + tileSize) || inRange(y2, y1, y1 + tileSize);
    return xOverlap && yOverlap;
  };

  handleDelay = () => {
    return setTimeout(function() {
      this.props.navigation.navigate("Eric");
    }, TIME_LIMIT);
  };

  render() {
    const {
      isTouched,
      isBoardValid,
      isGameRunning,
      board,
      depth,
      borderRadius,
      buttonColor,
      hasPressedButton,
      backgroundColor
    } = this.state;
    const halfDepth = depth / 2;
    const size = DEVICE_HEIGHT * 1.3;
    const endGameContainer = {
      position: "absolute",
      bottom: DEVICE_HEIGHT / 2 - size / 2,
      left: DEVICE_WIDTH / 2 - size / 2,
      height: size,
      width: size,
      borderRadius: size / 2,
      justifyContent: "center",
      alignItems: "center"
    };
    const titleStyle = {
      marginTop: isTouched ? depth : halfDepth,
      backgroundColor,
      borderRadius
    };
    const depthStyle = {
      marginTop: -borderRadius,
      height: isTouched ? halfDepth + borderRadius : depth + borderRadius,
      backgroundColor: "blue",
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    };
    const timerBackgroundColor = this.state.animateValue.interpolate({
      inputRange: [0, TIME_LIMIT * 0.4, TIME_LIMIT],
      outputRange: ["red", "blue", "green"]
    });
    const width = this.state.animateValue.interpolate({
      inputRange: [0, TIME_LIMIT],
      outputRange: [0, DEVICE_WIDTH]
    });
    const containerStyle = {
      position: "absolute",
      left: 0,
      bottom: 0
    };
    const tileSize = {
      width: TILE_SIZE,
      height: TILE_SIZE
    };

    // ERROR CAN'T FIND VARIABLE: tiles

    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/mobileGUI/sky_bg.png")}
      >
        <View style={styles.conatiner}>
          <View style={[styles.content, { width, timerBackgroundColor }]} />
        </View>

        <View style={styles.container} animation={"fadeIn"}>
          {isGameRunning && (
            <View style={styles.container}>
              <View style={styles.content} />
            </View>
          )}

          <View style={styles.container}>
            {board.map((tile, index) => (
              <View style={containerStyle} key={index}>
                <TouchableWithoutFeedback
                  onPressIn={this.handlePressIn}
                  onPressOut={this.handleUnSelect}
                  delayPressIn={0}
                >
                  <View
                    ref={ref => {
                      this.containerRef = ref;
                    }}
                  >
                    <View>
                      <Text>Some Text Here</Text>
                    </View>
                    <View />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  content: {
    marginTop: 25,
    backgroundColor: "blue",
    height: TIME_BAR_HEIGHT,
    borderColor: "purple",
    borderWidth: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
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
