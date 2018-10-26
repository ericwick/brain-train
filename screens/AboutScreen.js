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
                source={require("../assets/images/robot-dev.png")}
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
                source={require("../assets/images/robot-prod.png")}
                style={styles.prod}
              />
            </View>

            <Text style={styles.paragraph}>
              Begin by creating a new username and password and then you're all
              set to go!
            </Text>
          </View>

          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Splash")}
              title="BACK"
              buttonStyle={{
                backgroundColor: "#F9D49B",
                width: width - 280,
                height: height - height / 0.8,
                marginTop: (height / height) * 50,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 110
  },
  title: {
    fontFamily: "CarterOne",
    fontSize: 72,
    fontWeight: "bold",
    color: "green",
    textShadowColor: "#59A758",
    textShadowOffset: { width: -2, height: 3 },
    textShadowRadius: 6
  },
  pic: {
    alignItems: "center",
    justifyContent: "center"
  },
  dev: {
    width: width / 1.5,
    height: (height / height) * 350,
    borderColor: "#F92619",
    borderWidth: 5,
    borderRadius: 10,
    marginVertical: (height / height) * 25
  },
  prod: {
    width: width / 1.5,
    height: (height / height) * 350,
    borderColor: "#1927F9",
    borderWidth: 5,
    borderRadius: 10,
    marginVertical: (height / height) * 25
  },
  paragraph: {
    fontFamily: "CarterOne",
    fontSize: 20,
    marginHorizontal: (width / width) * 32,
    marginVertical: (height / height) * 25,
    justifyContent: "center",
    lineHeight: 35,
    alignItems: "center",
    justifyContent: "center"
  }
});
