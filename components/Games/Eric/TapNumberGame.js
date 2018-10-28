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
import SUCCESS_BG from "../../../assets/level_cleared_notext.png";

const ANDROID = Platform.OS === "android";
const { height, width } = Dimensions.get("window");

const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;

const TIME_BAR_HEIGHT = DEVICE_HEIGHT * 0.02;
const TIME_LIMIT = 30000;

const TILE_SIZE = DEVICE_WIDTH * 0.19;
const TILE_SHADOW_DEPTH = 6;
const TILE_BORDER_RADIUS = TILE_SIZE * 0.1;

const BOARD_MARGIN = 50;
const BOARD_HEIGHT = DEVICE_HEIGHT * 0.792;
const BOARD_WIDTH = DEVICE_WIDTH * 0.975;

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
      text: "1",
      value: 0,
      isEnabled: true,
      singlePressOnly: true,
      isVisible: true,
      animateValue: new Animated.Value(TIME_LIMIT),
      buttonColor: "green",
      hasPressedButton: false,
      gameOver: false
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

  async componentWillMount() {
    LayoutAnimation.linear();
    await this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    //imageAssets is an array of promises that must be fulfilled or resolved before settingState.
    //its function is to cache Images using the cacheImages function defined above
    const imageAssets = cacheImages([
      require("../../../assets/level_cleared_notext.png"),
      require("../../../assets/reload_btn.png")
    ]);
    await Promise.all([...imageAssets]);
  }

  tileRef = null;
  boardRef = null;
  containerRef = null;

  getContainerRef = () => this.containerRef;

  startGame() {
    this.setState({ level: 1, score: 0, isGameRunning: true, gameOver: false });
    this.buildBoard();
    this.startTimer();
  }

  nextLevel() {
    this.setState({ level: (this.state.level += 1) });
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
    var previousNumbers = [];

    times(numberOfTiles, num => {
      const id = uuid.v4();
      const pos = this.getRandomTilePosition(tiles);
      const isVisible = true;
      const number = this.getRandomNumber(this.state.level, previousNumbers);
      previousNumbers.push(number);
      tiles.push({ id, x: pos.x, y: pos.y, number, isVisible });
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
    let sortedActiveTiles = this.state.board.map((e, i, arr) => {
      return e.number;
    });

    sortedActiveTiles.sort(function(a, b) {
      return a - b;
    });

    if (tileId.number === sortedActiveTiles[0]) {
      this.setState({
        board: this.state.board.filter(
          e => (e.number !== tileId.number ? e : null)
        )
      });
    }
    if (this.state.board.length <= 1) {
      this.nextLevel();
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

  handleUnSelect = async () => {
    this.handleTilePress();
    if (this.tileRef && this.tileRef.getContainerRef()) {
      await this.tileRef.getContainerRef().bounceOut(200);
    }
  };

  handleRestartPress = async () => {
    this.setState({ hasPressedButton: true });
    await this.containerRef.zoomOut();
    this.props.navigation.navigate("Eric");
  };

  getRandomNumber = (level, usedNums) => {
    var randomNumber = 0;
    if (level === 1) {
      randomNumber = random(0, 49);
    } else if (level <= 3) {
      randomNumber = random(-9, 39);
    } else if (level <= 4) {
      randomNumber = random(-29, 49);
    } else if (level >= 5) {
      randomNumber = random(-69, 99);
    }
    return usedNums.includes(randomNumber)
      ? this.getRandomNumber()
      : randomNumber;
  };

  getNumberOfTiles = (level, number) => {
    const minNumberOfTiles = 3;
    const maximumNumberOfTiles = 7;
    const incrementFactor = this.state.level * 0.5;
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
      const randomX = Math.floor(Math.random() * (boardWidth - TILE_SIZE));
      const randomY = Math.floor(Math.random() * (boardHeight - TILE_SIZE));
      if (this.isPositionAvailable(randomX, randomY, board)) {
        position.x = randomX;
        position.y = Math.abs(randomY - TILE_SIZE);
        break;
      }
    }
    return position;
  };

  isPositionAvailable = (x, y, board) => {
    for (const tile of board) {
      if (this.doPositionsOverlap(x, y, tile.x, tile.y)) {
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
    // let { navigation } = this.props;
    return setTimeout(function() {
      //   navigation.navigate("Eric");
      this.setState({ gameOver: true });
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
    const size = DEVICE_HEIGHT * 1.0;
    const depthStyle = {
      marginTop: -borderRadius,
      height: isTouched ? halfDepth + borderRadius : depth + borderRadius,
      backgroundColor: "lightgray",
      borderBottomLeftRadius: borderRadius,
      borderBottomRightRadius: borderRadius
    };
    const timerBackgroundColor = this.state.animateValue.interpolate({
      inputRange: [0, TIME_LIMIT * 0.4, TIME_LIMIT],
      outputRange: ["red", "yellow", "green"]
    });
    const width = this.state.animateValue.interpolate({
      inputRange: [0, TIME_LIMIT],
      outputRange: [0, DEVICE_WIDTH]
    });
    const containerStyle = {
      position: "absolute"
    };
    const tileSize = {
      width: TILE_SIZE,
      height: TILE_SIZE
    };

    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/mobileGUI/sky_bg.png")}
      >
        <View style={styles.conatiner}>
          <View
            style={[
              styles.content,
              { width, backgroundColor: timerBackgroundColor }
            ]}
          />
        </View>

        <View style={styles.container} animation={"fadeIn"}>
          {board.map(
            (tile, index) =>
              !tile.isVisible ? null : (
                <View
                  style={{
                    position: "absolute",
                    left: tile.x,
                    top: tile.y
                  }}
                  key={index}
                >
                  <TouchableWithoutFeedback
                    onPressIn={() => this.handleTilePress(tile)}
                    delayPressIn={0}
                  >
                    <View>
                      <View style={styles.tile}>
                        <Text style={styles.text}>{tile.number}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )
          )}
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
    height: TIME_BAR_HEIGHT,
    borderWidth: 1
  },
  container: {
    flex: 1,
    position: "relative",
    padding: 20
  },
  tile: {
    width: TILE_SIZE,
    height: TILE_SIZE,
    backgroundColor: "rgba(234, 186, 106, 0.6)",
    borderColor: "#EBB703",
    borderRadius: 3,
    borderWidth: 3,
    alignItems: "center",
    paddingTop: 10
  },
  button: {
    width: 250,
    height: 100,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "black"
  },
  depth: {
    zIndex: 1
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 33
  }
});
