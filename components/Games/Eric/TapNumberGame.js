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
  constructor(props) {
    super(props);
    this.state = {
      board: [],
      tiles: [],
      blacklist: [],
      isGameRunning: false,
      isBoardValid: false,
      score: 0,
      timeLeft: 0,
      level: 1,
      isTouched: false,
      hasBeenPressed: false,
      depth: TILE_SHADOW_DEPTH,
      borderRadius: TILE_BORDER_RADIUS,
      backgroundColor: "red",
      text: "1",
      value: 0,
      isEnabled: true,
      singlePressOnly: true,
      isVisible: true,
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
      this.state.board.slice().filter(e => e.isVisible === true).length === 0
    );
  }

  buildBoard = () => {
    let tiles = [];
    this.setState({ isBoardValid: true });
    const numberOfTiles = this.getNumberOfTiles();
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

  handleTilePress = async id => {
    let tileId = this.state.board.find(e => e === id);
    let tileIdIndex = this.state.board.indexOf(tileId);
    let activeTiles = this.state.board.filter((e, i) => {
      if (e.isVisible === false) {
        return null;
      } else {
        return e;
      }
    });

    let sortedActiveTiles = this.state.board.map((e, i, arr) => {
      return e.number;
    });

    sortedActiveTiles.sort(function(a, b) {
      return a - b;
    });

    if (tileId.number === sortedActiveTiles[0]) {
      this.setState({ board: this.state.board.splice(tileIdIndex, 1) });
      //   tileId.isVisible = false;
      this.state.score++;
      if (this.isBoardEmpty && this.state.board.length === 0) {
        console.warn("ALL RIGHT");
        //   this.setState({ isBoardValid: false });
      } else {
        console.warn("ONE RIGHT");
        // this.nextLevel();
      }
    }
    if (this.state.board.length === 0) {
    }
      this.nextLevel();
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

  handleUnSelect = async () => {
    this.handleTilePress();
    if (this.tileRef && this.tileRef.getContainerRef()) {
      await this.tileRef.getContainerRef().bounceOut(200);
    }
    this.setState({ isVisible: false });
  };

  handleRestartPress = async () => {
    this.setState({ hasPressedButton: true });
    await this.containerRef.zoomOut();
    this.props.navigation.navigate("Eric");
  };

  getRandomNumber = () => {
    let { level } = this.state;
    // console.warn("Level", this.state.level);
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
    let total =
      numberOfTiles < maximumNumberOfTiles
        ? numberOfTiles
        : maximumNumberOfTiles;
    return total;
  };

  getRandomTilePosition = (board, x, y) => {
    const position = {};
    const boardOriginX = 20;
    const boardOriginY = 20;
    const boardWidth = BOARD_WIDTH - 20;
    const boardHeight = BOARD_HEIGHT - 20;
    while (true) {
      const randomX =
        Math.floor(Math.random() * (boardWidth - TILE_SIZE)) + boardOriginX;
      const randomY =
        Math.floor(Math.random() * (boardHeight - TILE_SIZE)) + boardOriginY;
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
    let { navigation } = this.props;
    return setTimeout(function() {
      navigation.navigate("Eric");
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
      backgroundColor,
      isVisible
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
    const tileStyle = {
      marginTop: isTouched ? depth : halfDepth,
      backgroundColor,
      borderRadius
    };
    const depthStyle = {
      marginTop: -borderRadius,
      height: isTouched ? halfDepth + borderRadius : depth + borderRadius,
      backgroundColor: "lightgray",
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

    // console.warn("BOARD", this.state.board);

    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/mobileGUI/sky_bg.png")}
      >
        {/* <View style={styles.conatiner}>
          <View style={[styles.content, { width, timerBackgroundColor }]} />
        </View> */}

        <View style={styles.container} animation={"fadeIn"}>
          {isGameRunning && (
            <View style={styles.container}>
              <View style={styles.content} />
            </View>
          )}

          <View style={styles.container}>
            {board.map(
              (tile, index) =>
                !tile.isVisible ? null : (
                  <View
                    style={{
                      right: tile.x / 2,
                      bottom: tile.y / 2
                    }}
                    key={index}
                    onPress={(tile.isVisible = false)}
                  >
                    <TouchableWithoutFeedback
                      onPressIn={() => this.handleTilePress(tile)}
                      delayPressIn={0}
                    >
                      <View
                        ref={ref => {
                          this.containerRef = ref;
                        }}
                      >
                        <View style={[styles.tile, tileStyle]}>
                          <Text style={styles.text}>{tile.number}</Text>
                        </View>
                        <View style={[styles.depth, depthStyle]} />
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                )
            )}
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
    // borderColor: "purple",
    borderWidth: 1
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: "lightgray"
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
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2
  },
  depth: {
    zIndex: 1
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 35
  }
});

// <BoardTile
//             ref={ref => this._tileRefs[index] = ref}
//             key={`board_tile_${tile.id}`}
//             left={tile.x}
//             bottom={tile.y}
//             backgroundColor={tile.color}
//             text={tile.number}
//             onTilePress={() => this.props.onTilePress(tile.id)}
//             isEnabled={this.props.isEnabled}
//             isVisible={tile.isVisible}
//           />

/* <Tile
  style={tileSize}
  ref={ref => {
    this.tileRef = ref;
  }}
  animation={"bounceIn"}
  backgroundColor={backgroundColor}
  text={text}
  onPressOut={this.handlePressOut}
  isEnabled={isEnabled}
/>; */

/* <TouchableWithoutFeedback
                  onPressIn={this.handlePressIn}
                  onPressOut={this.handleUnSelect}
                  delayPressIn={0}
                >
                  <View
                    ref={ref => {
                      this.containerRef = ref;
                    }}

                  >
                    <View style={[styles.tile, tileStyle, style]}>
                      <Text style={[styles.text, textStyle]}>Some Text Here</Text>
                    </View>
                    <View style={[styles.depth, depthStyle]}>
                  </View>
                </TouchableWithoutFeedback> */
