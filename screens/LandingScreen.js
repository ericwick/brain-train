import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../navigation/AppNavigator";

import { MonoText } from "../components/StyledText";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input } from "react-native-elements";

export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Text>{/* <Image
              source={
                __DEV__
                  ? require("../Images/logo.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            /> */}
            </Text>
          </View>

          <View style={styles.getStartedContainer}>
            <Text style={styles.dailyChallenge}>Daily Challenge</Text>

            <Text style={styles.missionStatement}>
              Our Mission Statement Goes Here
            </Text>
          </View>

          <View style={styles.gamesContainer}>
            <Text style={styles.gamesTitle}>Games: </Text>

            <Text>Memory </Text>

            <View style={styles.memoryGames}> </View>

            <Text>Problem Solving </Text>

            <View style={styles.memoryGames}> </View>

            <Text>Language</Text>

            <View style={styles.memoryGames}> </View>

            <Text>Speed </Text>

            <View style={styles.memoryGames}> </View>

            <Text>Math </Text>

            <View style={styles.memoryGames}> </View>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text>
            {/* NAVIGATION BAR TO BE RENDERED HERE */}

            {/* <View
              style={[styles.codeHighlightContainer, styles.navigationFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                navigation/MainTabNavigator.js
              </MonoText>
            </View> */}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 120,
    height: 90,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
    // marginRight:100
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  getStartedContainer: {
    alignItems: "center",
    // flex: "flex",
    // borderColor: "black",
    // borderWidth: 1,
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  dailyChallenge: {
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    // marginHorizontal: 50,
    height: 75,
    width: 250,
    marginBottom: 20
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
    marginBottom: 10
  },
  gamesTitle: {
    fontSize: 24
  },
  gamesContainer: {
    marginLeft: 20
    // alignItems: "center"
  },
  memoryGames: {
    // alignItems: "left",
    height: 75,
    width: 250,
    borderWidth: 1,
    borderColor: "black"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  }
  // helpContainer: {
  //   marginTop: 15,
  //   alignItems: "center"
  // },
  // helpLink: {
  //   paddingVertical: 15
  // },
  // helpLinkText: {
  //   fontSize: 14,
  //   color: "#2e78b7"
  // }
});
