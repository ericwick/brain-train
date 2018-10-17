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
import { Button, Tile } from "react-native-elements";
import PopupModal from '../components/popupModal/popupModal';


export default class LandingScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Input placeholder="BASIC INPUT" /> */}
        <Button
          raised
          icon={{ name: "home", size: 32 }}
          buttonStyle={{ backgroundColor: "red", borderRadius: 10 }}
          textStyle={{ textAlign: "center" }}
          title={`Welcome to\nReact Native Elements`}
        />
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/logo.png")
                  : require("../assets/images/logo.png")
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.dailyChallenge}>Daily Challenge</Text>

              <Tile
                imageSrc={require("../assets/images/Brain.jpg")}
                title="Our Mission at Brain Train is to provide...some shit goes here "
                featured
                caption="Some Caption Text"
              />
             
          </View>
          <View style={styles.gamesContainer}>
            <Text style={styles.gamesTitle}>Games: </Text>
            <Text>Memory </Text>
            <View style={styles.memoryGames}> 
            </View>
            <Text>Problem Solving </Text>
            <View style={styles.memoryGames}> 
            </View>
            <Text>Language</Text>
            <View style={styles.memoryGames}> 
            </View>
            <Text>Speed </Text>
            <View style={styles.memoryGames}> 
            </View>
            <Text>Math </Text>
            <View style={styles.memoryGames}> 
            </View>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          {/* Learn more */}
        </Text>
      );

      return <Text style={styles.developmentModeText}>{learnMoreButton}</Text>;
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", 
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
    width: 150,
    height: 120,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
    // marginRight:100
  },
  LandingScreenFilename: {
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
    marginBottom: 20
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
    width: 300,
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
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});