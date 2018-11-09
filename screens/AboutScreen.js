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

export default class AboutScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    // ADD OTHER GAMES ONCE THEY ARE CHANGED TO LOOK LIKE THEY FIT IN THE APPLICATION

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
            <Text style={styles.title}>ABOUT</Text>
          </View>

          <View>
            <Image
              source={require("../assets/images/railroadTracks.png")}
              style={styles.break}
            />
          </View>

          <View contentContainerStyle={styles.container}>
            <Text style={styles.paragraph}>
              Brain Train was developed by a team of highly skilled googlers
              looking to provide people with a way to keep their minds sharp
              while playing simple, entertaining games ranging from speed
              challenges to mind boggling riddles. Consistent users will notice
              the improvement to their core cognitive abilities through their
              steady mindfulness, better sleep, and improved mental focus.
            </Text>

            <View style={styles.pic}>
              <Image
                source={require("../assets/images/TapGame2.jpeg")}
                style={styles.dev}
              />
            </View>

            <Text style={styles.paragraph}>
              After you login, you will be directed to the Home page where you
              will first find the daily challenge which will provide you with
              the problem of the day and could be any of the games available.
              Below the daily challenge you will find the rest of the training
              options within the application. These options include (but are not
              limited to) speed games, memory games, multiple choice trivia and
              riddles, and arithmetic!
            </Text>

            <View style={styles.pic}>
              <Image
                source={require("../assets/images/TapGame4.jpeg")}
                style={styles.prod}
              />
            </View>
          </View>
          <View>
            <Image
              source={require("../assets/images/railroadTracks.png")}
              style={styles.break}
            />
          </View>
          <Text style={styles.started}>
            BEGIN BY CREATING A NEW USERNAME AND PASSWORD AND THEN YOU'RE ALL
            SET TO GO!
          </Text>
          <View>
            <Image
              source={require("../assets/images/railroadTracks.png")}
              style={styles.break}
            />
          </View>

          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Splash")}
              title="BACK"
              buttonStyle={{
                backgroundColor: "#F9D49B",
                width: width - 280,
                height: height - height / 0.8,
                marginTop: (height / height) * 100,
                borderColor: "#FD9B03",
                borderWidth: 3,
                borderRadius: 5
              }}
              textStyle={{
                color: "#FD9B03",
                fontSize: 18,
                letterSpacing: 1,
                fontWeight: "bold"
              }}
            />
          </TouchableOpacity>
        </ScrollView>
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
    height: height - height / 1.4,
    transform: [{ rotate: "-2deg" }],
    marginTop: (width / width) * 50
  },
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 110
  },
  break: {
    width: width - 100,
    height: height / 40,
    marginBottom: 10
  },
  title: {
    fontFamily: "CarterOne",
    fontSize: 72,
    fontWeight: "bold",
    color: "#12A855",
    textShadowColor: "#59A758",
    textShadowOffset: { width: -2, height: 3 },
    textShadowRadius: 6,
    marginBottom: 25
  },
  pic: {
    alignItems: "center",
    justifyContent: "center"
  },
  dev: {
    resizeMode: "cover",
    width: width - width / 3,
    height: (height / height) * 510,
    borderColor: "#F92619",
    borderWidth: 5,
    borderRadius: 10,
    marginVertical: (height / height) * 25
  },
  prod: {
    resizeMode: "cover",
    width: width - width / 3,
    height: (height / height) * 510,
    borderColor: "#1927F9",
    borderWidth: 5,
    borderRadius: 10,
    marginTop: (height / height) * 25,
    marginBottom: (height / height) * 100
  },
  started: {
    alignItems: "center",
    fontFamily: "CarterOne",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    lineHeight: 50,
    textShadowRadius: 10,
    textShadowOffset: { width: 2, height: 2 },
    marginHorizontal: (width / width) * 25,
    marginVertical: (height / height) * 45
  },
  paragraph: {
    fontFamily: "CarterOne",
    fontSize: 20,
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
    textShadowOffset: { width: 1, height: 1 },
    marginHorizontal: (width / width) * 25,
    marginVertical: (height / height) * 25,
    justifyContent: "center",
    lineHeight: 35,
    alignItems: "center"
  }
});
