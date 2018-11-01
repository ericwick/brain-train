import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../navigation/AppNavigator";
import { AsyncStorage } from "react-native";
import axios from "axios";
import Nav from "../components/NavBar/Nav";

import { MonoText } from "../components/StyledText";
import { Button, Tile } from "react-native-elements";
import PopupModal from "../components/popupModal/popupModal";

const { height, width } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      users: []
    };
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    var currentUser = await AsyncStorage.getItem("user")
      .then(value => {
        this.setState({
          user: JSON.parse(value)
        });
        console.log("Homescreen currentUser", this.state.user);
      })
      .catch(err => {
        console.warn("Error loading current user");
      });
    let point = `http://${
      __DEV__
        ? Platform.OS === "ios"
          ? "localhost"
          : "172.31.99.105"
        : production.url
    }:3001/api/users`;
    axios
      .get(
        `http://${
          __DEV__
            ? Platform.OS === "ios"
              ? "localhost"
              : "172.31.99.105"
            : production.url
        }:3001/api/users`
      )
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.warn(err));
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.image}
            />
          </View>

          <View>
            <Image
              source={require("../assets/images/railroadTracks.png")}
              style={styles.linebreak}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Eric")}
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: width * 0.1
            }}
          >
            <ImageBackground
              source={require("../assets/images/Brain.jpg")}
              style={styles.dailyChallenge}
            >
              <Text style={styles.challenge}>Daily Challenge</Text>
            </ImageBackground>
          </TouchableOpacity>

          <View>
            <Image
              source={require("../assets/images/railroadTracks.png")}
              style={styles.linebreak}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.gamesTitle}>GAMES </Text>
          </View>

          <View style={styles.container}>
            <View>
              <Button
                title="Trivia"
                onPress={() => this.props.navigation.navigate("TriviaGame")}
                buttonStyle={styles.firstButton}
                textStyle={styles.firstText}
              />
            </View>

            <View style={styles.container}>
              <Button
                title="Tile Counts "
                onPress={() => this.props.navigation.navigate("Aftab")}
                buttonStyle={styles.secondButton}
                textStyle={styles.secondText}
              />
            </View>
            <View style={styles.container}>
              <Button
                title="Memory Tiles "
                onPress={() => this.props.navigation.navigate("MemoryTiles")}
                buttonStyle={styles.thirdButton}
                textStyle={styles.thirdText}
              />
            </View>
            <View>
              <Button
                title="Number Tap"
                onPress={() => this.props.navigation.navigate("Eric")}
                buttonStyle={styles.fourthButton}
                textStyle={styles.fourthText}
              />
            </View>
            {/* <View>
              <Button
                title="SPEED"
                onPress={() => this.props.navigation.navigate("Home")}
                buttonStyle={styles.fifthButton}
                textStyle={styles.fifthText}
              />
            </View>
            <View>
              <Button
                title="MATH"
                onPress={() => this.props.navigation.navigate("Home")}
                buttonStyle={styles.sixthButton}
                textStyle={styles.sixthText}
              />
            </View> */}
          </View>
        </ScrollView>
        <Nav navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  image: {
    resizeMode: "contain",
    width: width - 65,
    height: height - height / 1.45,
    transform: [{ rotate: "-2deg" }],
    marginRight: width * 0.05,
    marginVertical: width * 0.1
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 140
  },
  linebreak: {
    width: width - 75,
    height: height / 40
  },
  homeTitle: {
    fontSize: 52,
    textAlign: "center",
    marginBottom: 15,
    color: "#FF7F7B",
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  dailyChallenge: {
    flex: 1,
    width: width - width / 6,
    height: height - height / 1.4,
    marginTop: height / 10,
    marginBottom: height / 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    borderColor: "green",
    borderWidth: 5
  },
  challenge: {
    fontSize: 35,
    fontFamily: "CarterOne",
    color: "white",
    letterSpacing: 1,
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  },
  firstButton: {
    width: 300,
    height: 100,
    marginVertical: 40,
    borderWidth: 5,
    borderRadius: 5,
    backgroundColor: "#FAA7A1",
    borderColor: "#FC1102"
  },
  firstText: {
    fontSize: 30,
    color: "#FC1102",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  gameContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FCCE82",
    width: 300,
    height: 135,
    marginVertical: 40,
    borderColor: "#FC9D01",
    borderWidth: 5,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10
  },
  sixthButton: {
    width: 300,
    height: 100,
    marginVertical: 40,
    borderWidth: 5,
    borderRadius: 5,
    backgroundColor: "#FCCE82",
    borderColor: "#FC9D01"
  },
  sixthText: {
    fontSize: 30,
    color: "#FC9D01",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  thirdButton: {
    backgroundColor: "#FDFD01",
    width: 300,
    height: 100,
    marginVertical: 40,
    borderColor: "#B1B102",
    borderWidth: 5,
    borderRadius: 5
  },
  thirdText: {
    fontSize: 30,
    color: "#B1B102",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  fourthButton: {
    backgroundColor: "#7DDE77",
    width: 300,
    height: 100,
    marginVertical: 40,
    borderColor: "#0EC203",
    borderWidth: 5,
    borderRadius: 5
  },
  fourthText: {
    fontSize: 30,
    color: "#0EC203",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  fifthButton: {
    backgroundColor: "#8997FA",
    width: 300,
    height: 100,
    marginVertical: 40,
    borderColor: "#0321FA",
    borderWidth: 5,
    borderRadius: 5
  },
  fifthText: {
    fontSize: 30,
    color: "#0321FA",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  secondButton: {
    backgroundColor: "#8AD1F4",
    width: 300,
    height: 100,
    marginVertical: 40,
    borderColor: "#0283C2",
    borderWidth: 5,
    borderRadius: 5
  },
  secondText: {
    fontSize: 30,
    color: "#0283C2",
    letterSpacing: 1,
    textShadowColor: "#12719F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  missionStatement: {
    position: "relative",
    borderColor: "black",
    borderWidth: 1,
    height: 75,
    width: 250,
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20
  },
  gamesTitle: {
    fontSize: 68,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 15,
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  },
  buttonText: {
    fontSize: 15,
    color: "#FF7F7B",
    letterSpacing: 1,
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  }
});
