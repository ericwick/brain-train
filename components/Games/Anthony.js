import React, { Component } from 'react';
import Exponent, { Components, Font, Asset  } from 'expo';
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
// import BTN_NORMAL from './assets/btn_normal.png';
// import BTN_SUCCESS from './assets/btn_success.png';
// import BTN_ERROR from './assets/btn_error.png';
// import STAR_NORMAL from './assets/star_normal.png';
// import STAR_ACTIVE from './assets/star_active.png';
// import MODAL_BG from './assets/level_cleared_bg.png';
// import RELOAD_BTN from './assets/reload_btn.png';
// import GAME_BG from './assets/game_bg.png';

const { width, height } = Dimensions.get('window');
const CELL_HEIGHT = 50;
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
export default class Anthony extends Component {
  constructor(props) {
    super(props);

    // this.timer = null;
    this.animatedValue = [];
    arr.forEach(value => {
      this.animatedValue[value] = new Animated.Value(0);
    });

    this.state = {
      level: 1,
      game: this.makeMatrix(1),
      moveTo: 0,
      finished: false,
      position: new Animated.ValueXY(),
      animateModal: new Animated.Value(0),
      gameStarted: false,
      score: 0,
      stars: 2
    };
  }

  async componentWillMount() {
    LayoutAnimation.linear();
    await this._loadAssetsAsync();
  }

  async _loadAssetsAsync() { 
    // //imageAssets is an array of promises that must be fulfilled or resolved before settingState. 
    //   //its function is to cache Images using the cacheImages function defined above
    // const imageAssets = cacheImages([             
    //   require('./assets/btn_normal.png'), 
    //   require('./assets/btn_error.png'),
    //   require('./assets/btn_success.png'),
    //   require('./assets/game_bg.png'),
    //   require('./assets/level_cleared_bg.png'),
    //   require('./assets/reload_btn.png'),
    //   require('./assets/star_normal.png'),
    //   require('./assets/star_active.png')
    // ]);

    // await Promise.all([...imageAssets]);

    this.setState({
      appIsReady: true,
      timeRemaining: null
    });
  }

  makeMatrix(grid = Math.round(Math.random() * 3) + 1) {
    //grid = makes a random number between 1-4
    let matrix = [];
    for (var i = 0; i < 9; i++) {
      matrix[i] = [];                   //matrix = makes an array with 9 empty arrays
      for (var j = 0; j < grid + 1; j++) {
        if (j === 0) {
          matrix[i][j] = i + 1;
        } else {
          let random = Math.round(Math.random() * 9);   
          if (random === i + 1) {
            random = random + 1 === 10 ? random - 1 : random + 1;   //for the first 8 values in the array if the random numbers = the target number (first value) it increments by 1. Otherwise if it's 9 it decrements by 1 
          }
          matrix[i][j] = random;
        }
      }
      this.shuffle(matrix[i]);   //shuffyls
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

  animateGame(moveTo) {
    const { gameOver, finished } = this.state;

    Animated.timing(this.state.position, {
      duration: 200,
      toValue: { x: 0, y: moveTo * CELL_HEIGHT },
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
        game: this.makeMatrix()
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
    if (time >= 1.1) {
      return 3;
    } else if (time <= 1.099999 && time >= 0.4) {
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
          position: 'absolute',
          top: 0,
          height: height,
          width: width,
          paddingHorizontal: 20,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            height: height,
            width: width,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
              {
                scale: scaleModal
              }
            ]
          }}>
            <View style={[styles.topContent]}>
              <Text style={styles.shadowSmall}>Game Over</Text>
            </View>
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
          position: 'absolute',
          top: 0,
          height: height,
          width: width,
          paddingHorizontal: 20,
          backgroundColor: 'rgba(0,0,0,0.7)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            height: height,
            width: width,
            paddingHorizontal: 20,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            transform: [
              {
                scale: scaleModal
              }
            ]
          }}>
            <View
              style={[
                styles.topContent,
                { paddingTop: width / 4, 
                  justifyContent: 'flex-start',
                  width: width - 40,
                  height: width,
                  resizeMode: 'contain' }
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 20
                }}>
                {[0, 1, 2].map(i => {
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
                      }}>
                    </Animated.View>
                  );
                })}
              </View>
              <Text style={[styles.shadowSmall, { fontSize: 12 }]}>
                Score: {this.state.score}
              </Text>
            </View>
          {this.renderReload()}
        </Animated.View>
      </View>
    );
  }

  renderReload() {
    const SIZE = width / 5;
    return (
      <TouchableOpacity 
        onPress={() => this.restartGame()} 
        style={{
          width: SIZE,
          height: SIZE,
          resizeMode: 'contain',
          position: 'absolute',
          top: -15 - SIZE / 2,
          left: -SIZE / 2
          }}
        />
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
        <View style={styles.container}>
          {gameStarted && !gameOver
            ? <CountdownTimer
                initialTimeRemaining={10000}
                interval={60}
                completeCallback={() => this.gameoverResetState()}
                tickCallback={timeRemaining =>
                  this.setState({
                    timeRemaining: (timeRemaining / 1000).toFixed(1)
                  })}
              />
            : <Text
                style={[
                  {
                    fontSize: 12,
                    color: '#fff',
                    fontWeight: '300',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 1,
                      height: 2
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 0,
                    backgroundColor: 'transparent'
                  }
                ]}>
                {this.state.finished || this.state.gameOver
                  ? this.state.timeRemaining
                  : 'Ten Seconds'}
              </Text>}
          {this.renderGame()}
        {gameOver
          ? this.renderGameOver()
          : finished ? this.renderCongrats() : null}
        </View>
    );
  }

  getRandomRotation() {
    return `${[-1, 1][Math.random() * 2 | 0] * Math.round(Math.random() * 12)}deg`;
  }

  gameoverResetState() {
    this.setState({
      gameOver: true,
      gameStarted: false
    });

    setTimeout(() => this.animateGame(9.5), 500);
  }

  renderGame() {
    const { game, moveTo, timeRemaining } = this.state;

    return (
      <View style={{ height: height * 3 / 4, overflow: 'hidden', width }}>
        <Animated.View style={this.getGameStyle()}>
          {this.reversedKeys().map(index => {
            return (
              <View style={styles.row} key={index}>
                {game[index].map((cell, i) => {
                  const parsedIndex = parseFloat(index);
                  const selectedStyle = 
                    (moveTo - 1 === parsedIndex && moveTo === cell) ||
                    (this.state.finished && moveTo === parsedIndex && moveTo + 1 === cell);
                  const gameOverStyle = this.state.gameOver;

                  const cellWidth = GAME_WIDTH / game[index].length;

                  return (
                    <TouchableOpacity
                      focusedOpacity={0.7}
                      activeOpacity={0.7}
                      style={[styles.cell]}
                      key={index + cell + i}
                      onPress={() => {
                        this.setState({
                          gameStarted: true
                        });
                        if (
                          cell !== parsedIndex + 1 || moveTo !== parsedIndex
                        ) {
                          this.gameoverResetState();

                          return;
                        }

                        this.animateGame(moveTo);

                        if (moveTo === 8) {
                          this.setState({
                            score: (moveTo + 1) * MULTIPLIER +
                              timeRemaining * 100,
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
                      }}>
                      <View
                        style={[
                          styles.cellContent,
                          {
                            transform: [
                              {
                                rotate: this.state.gameOver
                                  ? this.getRandomRotation()
                                  : '0deg'
                              }
                            ]
                          }
                        ]}>
                          <Text
                            style={[
                              styles.cellText,
                              styles.shadow,
                              {
                                fontSize: Math.min(
                                  CELL_HEIGHT * 0.55,
                                  cellWidth
                                )
                              }
                            ]}>
                            {cell}
                          </Text>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40
  },
  cellText: {
    fontSize: 12,
    color: 'white'
  },
  cell: {
    flex: 1,
    height: CELL_HEIGHT
  },
  imageCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: CELL_HEIGHT,
    resizeMode: 'stretch'
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

  backgroundImage: {
    resizeMode: 'cover',
    height: height,
    width: width
  },

  gameContent: {
    flex: 8,
    width: GAME_WIDTH,
    height: 9 * CELL_HEIGHT,
    alignSelf: 'center',
    justifyContent: 'flex-end'
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