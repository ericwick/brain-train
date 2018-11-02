import React, { Component } from "react";
import Exponent, { Components, Font, Asset } from "expo";
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
  LayoutAnimation //
} from "react-native";
import CountdownTimer from "./Timer";
import BTN_NORMAL from "../../../../assets/images/Memory_Tile.png";
import BTN_NORMAL2 from "../../../../assets/images/Memory_Tile.png";
import BTN_SUCCESS from "../../../../assets/images/Memory_Tile.png";
import BTN_ERROR from "../../../../assets/images/Memory_Tile_Wrong.png";
import STAR_NORMAL from "../../../../assets/star_normal.png";
import STAR_ACTIVE from "../../../../assets/star_active.png";
import SUCCESS_BG from "../../../../assets/level_cleared_notext.png";
import FAILURE_BG from "../../../../assets/level_failed_notext.png";
import RELOAD_BTN from "../../../../assets/reload_btn.png";
import GAME_BG from "../../../../assets/Memory_Tiles_BG.jpg";

const { width, height } = Dimensions.get("window");
const CELL_HEIGHT = 100;
const PADDING = 10;
const GAME_WIDTH = width - 10;
const MULTIPLIER = 100;

function cacheImages(images) {
  return images.map(image => Asset.fromModule(image).downloadAsync());
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

const arr = [];
for (var i = 0; i < 3; i++) {
  arr.push(i);
}
//array [0,1,2]
export default class TapTile extends Component {
  constructor(props) {
    super(props);

    // this.timer = null;
    this.animatedValue = [];
    arr.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });

    this.state = {
      // level: 3,
      game: this.makeMatrix(this.props.level, 8),
      moveTo: 0,
      finished: false,
      position: new Animated.ValueXY(),
      animateModal: new Animated.Value(0),
      gameStarted: false,
      score: 0,
      stars: 3,
      last: 0
    };
  }
  static navigationOptions = {
    header: null
  };

  async componentWillMount() {
    LayoutAnimation.linear();
    await this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    //imageAssets is an array of promises that must be fulfilled or resolved before settingState.
    //its function is to cache Images using the cacheImages function defined above
    const imageAssets = cacheImages([
      require("../../../../assets/btn_normal.png"),
      require("../../../../assets/images/Memory_Tile.png"),
      require("../../../../assets/images/Memory_Tile_Wrong.png"),
      require("../../../../assets/btn_success_logan.png"),
      require("../../../../assets/Memory_Tiles_BG.jpg"),
      require("../../../../assets/level_cleared_notext.png"),
      require("../../../../assets/level_failed_notext.png"),
      require("../../../../assets/reload_btn.png"),
      require("../../../../assets/star_normal.png"),
      require("../../../../assets/star_active.png")
    ]);

    await Promise.all([...imageAssets]);

    this.setState({
      appIsReady: true,
      timeRemaining: null
    });
  }

  makeMatrix(n = 4, t = 10) {
    let arr = [];
    for (i = 1; i <= n * n; i++) {
      if (i <= t) {
        arr.push({ number: i, opacity: 1 });
      } else if (i > t) {
        arr.push({ number: i, opacity: 1 });
      }
    }
    function shuffle(a) {
      var j, x, i;
      for (i = a.length; i > 0; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
      }
      return a;
    }
    arr = shuffle(arr);
    let matrix = [];
    for (i = 0; i < arr.length; i += n) {
      matrix.push(arr.slice(i, i + n));
    }
    return matrix;
  }

  getGameStyle() {
    return [
      styles.gameContent,
      { transform: this.state.position.getTranslateTransform() }
    ];
  }

  animateModal() {
    const { gameOver, finished } = this.state;

    Animated.spring(this.state.animateModal, {
      bounciness: 12,
      speed: 3,
      toValue: finished || gameOver ? 1 : 0,
      useNativeDriver: true
    }).start();
  }
  //The animation for the cells moving down the screen --> moveTo * height of each cell
  animateGame(moveTo) {
    const { gameOver, finished } = this.state;

    Animated.timing(this.state.position, {
      duration: 200,
      toValue: { x: 0, y: 0 },
      useNativeDriver: true
    }).start(() => {
      this.animateModal();
    });
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length; i > 0; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  reversedKeys() {
    // console.log('game', this.state.game);
    // console.log('game sorted', this.state.game.sort((a, b) => b - a));
    // console.log('Object.Keys', Object.keys(this.state.game).sort((a, b) => b - a));
    return Object.keys(this.state.game).sort((a, b) => b - a);
  }

  restartGame() {
    arr.map(item => this.animatedValue[item].setValue(0));
    this.setState(
      {
        moveTo: 0,
        gameStarted: false,
        finished: false,
        gameOver: false,
        level: 1,
        score: 0,
        game: this.makeMatrix(4, 8)
      },
      () => {
        const { gameOver, finished } = this.state;

        Animated.spring(this.state.position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true
        }).start();
      }
    );
  }

  getStarsCount(time) {
    if (time >= 5) {
      return 3;
    } else if (time >= 3) {
      return 2;
    } else {
      return 1;
    }
  }

  renderGameOver() {
    const scaleModal = this.state.animateModal.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1]
    });

    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          height: height,
          width: width,
          paddingHorizontal: 20,
          backgroundColor: "rgba(0,0,0,0.7)",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            height: height,
            width: width,
            paddingHorizontal: 20,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              {
                scale: scaleModal
              }
            ]
          }}
        >
          <ImageBackground
            source={FAILURE_BG}
            style={{
              width: width - 40,
              height: width
              // resizeMode: "contain"
            }}
          >
            <View style={[styles.topContent]}>
              <Text style={styles.shadowSmall}>Game over</Text>
            </View>
          </ImageBackground>
          {this.renderReload()}
        </Animated.View>
      </View>
    );
  }

  renderCongrats() {
    const scaleModal = this.state.animateModal.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1]
    });

    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          height: height,
          width: width,
          paddingHorizontal: 20,
          backgroundColor: "rgba(0,0,0,0.7)",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            height: height,
            width: width,
            paddingHorizontal: 20,
            backgroundColor: "transparent",
            justifyContent: "center",
            alignItems: "center",
            transform: [
              {
                scale: scaleModal
              }
            ]
          }}
        >
          <ImageBackground
            source={SUCCESS_BG}
            style={{
              width: width - 40,
              height: width
              // resizeMode: "contain"
            }}
          >
            <View
              style={[
                styles.topContent,
                { paddingTop: width / 4, justifyContent: "flex-start" }
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginBottom: 20
                }}
              >
                {arr.map(i => {
                  const animations = arr.map(item => {
                    return Animated.spring(this.animatedValue[item], {
                      toValue: 1
                    });
                  });
                  Animated.sequence([
                    Animated.delay(400),
                    Animated.stagger(200, animations)
                  ]).start();

                  return (
                    <Animated.View
                      key={i}
                      style={{
                        transform: [
                          {
                            scale: this.animatedValue[i]
                          }
                        ]
                      }}
                    >
                      <ImageBackground
                        source={STAR_NORMAL}
                        style={{
                          transform: [
                            {
                              scale: i === 1 ? 1 : 0.8
                            },
                            {
                              rotate:
                                i === 1 ? "0deg" : i === 0 ? "-7deg" : "7deg"
                            }
                          ]
                        }}
                      >
                        {this.state.stars >= i + 1 ? (
                          <Image source={STAR_ACTIVE} />
                        ) : null}
                      </ImageBackground>
                    </Animated.View>
                  );
                })}
              </View>
              <Text style={[styles.shadowSmall, { fontSize: 22 }]}>
                Score: {this.state.score}
              </Text>
            </View>
          </ImageBackground>
          {this.renderReload()}
        </Animated.View>
      </View>
    );
  }

  renderReload() {
    const SIZE = width / 5;
    return (
      <TouchableOpacity onPress={() => this.restartGame()}>
        <Image
          source={RELOAD_BTN}
          style={{
            width: SIZE,
            height: SIZE,
            resizeMode: "contain"
            // position: "absolute",
            // top: -15 - SIZE / 2, //uncomment this to render properly on iPhone
            // left: -SIZE / 2
          }}
        />
      </TouchableOpacity>
    );
  }

  render() {
    const {
      timeRemaining,
      score,
      gameOver,
      finished,
      appIsReady,
      gameStarted,
      stars
    } = this.state;

    // if (!appIsReady) {
    //   return <AppLoading />;
    // }

    return (
      <ImageBackground style={styles.backgroundImage} source={GAME_BG}>
        <View style={styles.container}>
          {gameStarted && !gameOver ? (
            <CountdownTimer
              initialTimeRemaining={8000}
              interval={60}
              completeCallback={() => this.gameoverResetState()}
              tickCallback={timeRemaining =>
                this.setState({
                  timeRemaining: (timeRemaining / 1000).toFixed(1)
                })
              }
            />
          ) : (
            //This is where the timer is rendered
            <Text
              style={[
                {
                  fontSize: 42,
                  color: "#fff",
                  fontWeight: "700",
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 1,
                    height: 2
                  },
                  shadowOpacity: 0.4,
                  shadowRadius: 0,
                  backgroundColor: "transparent"
                }
              ]}
            >
              {this.state.finished || this.state.gameOver
                ? this.state.timeRemaining
                : "Ten Seconds"}
            </Text>
          )}
          {this.renderGame()}
        </View>
        {gameOver
          ? this.renderGameOver()
          : finished
            ? this.renderCongrats()
            : null}
      </ImageBackground>
    );
  }

  getRandomRotation() {
    return `${[-1, 1][(Math.random() * 2) | 0] *
      Math.round(Math.random() * 12)}deg`;
  }

  gameoverResetState() {
    this.setState({
      gameOver: true,
      gameStarted: false,
      last: 0
    });

    setTimeout(() => this.animateGame(9.5), 500);
  }

  renderGame() {
    const { game, moveTo, timeRemaining } = this.state;
    32;

    return (
      <View style={{ height: (height * 3) / 4, overflow: "hidden", width }}>
        {/* <Text> hello</Text> */}
        <Animated.View style={this.getGameStyle()}>
          {this.reversedKeys().map(index => {
            return (
              <View style={styles.row} key={index}>
                {/* {taking the matrix and mapping over each row array and producing cells with an index (i) attached to them} */}
                {game[index].map((cell, i) => {
                  //parsedIndex = row number -1
                  const parsedIndex = parseFloat(index);
                  const selectedStyle =
                    cell.number === this.state.last + 1 ||
                    (this.state.finished &&
                      moveTo === parsedIndex &&
                      moveTo + 1 === cell.number);
                  const gameOverStyle = this.state.gameOver;

                  let image = BTN_NORMAL;
                  if (
                    (index % 2 === 0 && i % 2 === 0) ||
                    (index % 2 === 1 && i % 2 === 1)
                  ) {
                    image = BTN_NORMAL2;
                  }

                  if (selectedStyle) {
                    image = BTN_SUCCESS;
                  }
                  if (gameOverStyle) {
                    image = BTN_ERROR;
                  }

                  const cellWidth = GAME_WIDTH / game[index].length;

                  return (
                    <TouchableOpacity
                      //how much tiles dissapear on click
                      focusedOpacity={0.7}
                      activeOpacity={0.7}
                      style={[styles.cell]}
                      key={index + cell + i}
                      onPress={() => {
                        console.log("Clicked");
                        this.setState({
                          gameStarted: true
                        });
                        if (cell.number !== this.state.last + 1) {
                          console.log(
                            "GameOver: moveTo, parsedIndex",
                            moveTo,
                            parsedIndex
                          );
                          this.gameoverResetState();

                          return;
                        }
                        this.setState({ last: this.state.last + 1 });
                        this.animateGame(moveTo);
                        if ((this.state.gameStarted = true)) {
                          console.log("started");
                        }

                        if (moveTo === 7) {
                          //game.length-1 is 3 here
                          this.setState({
                            score:
                              (moveTo + 1) * MULTIPLIER + timeRemaining * 100,
                            moveTo: moveTo + 1,
                            finished: true,
                            gameStarted: false,
                            stars: this.getStarsCount(timeRemaining)
                          });

                          return;
                        }
                        this.setState({
                          moveTo: moveTo + 1,
                          score: (moveTo + 1) * MULTIPLIER
                        });
                      }}
                    >
                      <View
                        style={[
                          styles.cellContent,
                          {
                            transform: [
                              {
                                rotate: this.state.gameOver
                                  ? this.getRandomRotation()
                                  : "0deg"
                              }
                            ]
                          }
                        ]}
                      >
                        <ImageBackground
                          source={image}
                          style={[
                            styles.imageCell,
                            { width: cellWidth, opacity: cell.opacity }
                          ]}
                        >
                          <Text
                            style={[
                              styles.cellText,
                              styles.shadow,
                              {
                                //font size of the numbers is roughly half of cell height
                                fontSize: Math.min(
                                  CELL_HEIGHT * 0.55,
                                  cellWidth
                                )
                              }
                            ]}
                          >
                            {!this.state.gameStarted && cell.number}
                          </Text>
                        </ImageBackground>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
    marginBottom: 42
  },
  cellText: {
    fontFamily: "CarterOne",
    fontSize: 42,
    color: "white"
    // opacity:0
  },
  cell: {
    flex: 1,
    height: CELL_HEIGHT,
    marginBottom: PADDING
  },
  cell2: {
    opacity: 0,
    flex: 1,
    height: CELL_HEIGHT,
    marginBottom: PADDING
  },
  imageCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: CELL_HEIGHT
    // resizeMode: "stretch"
  },

  cellContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  row: {
    flexDirection: "row"
  },

  topContent: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },

  backgroundImage: {
    // resizeMode: "cover",
    height: height,
    width: width
  },

  gameContent: {
    flex: 8,
    width: GAME_WIDTH,
    height: 9 * CELL_HEIGHT,
    alignSelf: "center",
    justifyContent: "flex-end"
  },

  shadow: {
    fontSize: 42,
    color: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3
    },
    shadowOpacity: 0.35,
    shadowRadius: 0,
    backgroundColor: "transparent"
  },

  shadowSmall: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "900",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2.5
    },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    backgroundColor: "transparent"
  },

  small: {
    fontSize: 24
  }
});
