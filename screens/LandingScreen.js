import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../navigation/AppNavigator";
import axios from "axios";
import Nav from "../components/NavBar/Nav";

import { MonoText } from "../components/StyledText";
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input } from "react-native-elements";
import { Tile } from "react-native-elements";

export default class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  // We'll grab all users from reducer once its set up

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Button
          raised
          icon={{ name: "home", size: 32 }}
          buttonStyle={{
            backgroundColor: "red",
            borderRadius: 10,
            marginTop: 40
          }}
          textStyle={{ textAlign: "center" }}
          title={`Welcome to\nReact Native Elements`}
        /> */}
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.dailyChallenge}>
            <Button title="DAILY CHALLENGE" />
          </View>

          <View style={styles.tilePic}>
            <Tile
              imageSrc={require("../assets/images/Brain.jpg")}
              title="Our Mission at Brain Train is to provide...some shit goes here "
              featured
              caption="Some Caption Text"
            />
          </View>

          <View style={styles.gamesContainer}>
            <Text style={styles.gamesTitle}>GAMES </Text>
            <View />

            <View style={styles.memoryGames}>
              <Button title="MEMORY" />
            </View>
            <View style={styles.memoryGames}>
              <Button title="PROBLEM SOLVING" />
            </View>
            <View style={styles.memoryGames}>
              <Button title="LANGUAGE" />
            </View>
            <View style={styles.memoryGames}>
              <Button title="SPEED" />
            </View>
            <View style={styles.memoryGames}>
              <Button title="MATH" />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#3783F5"
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
    width: 380,
    height: 320,
    resizeMode: "contain"
    // marginTop: 3
    // marginLeft: -10
    // marginRight:100
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
    fontSize: 35,
    textAlign: "center",
    marginRight: 20
  },
  gamesContainer: {
    marginLeft: 20
    // alignItems: "center"
  },
  dailyChallenge: {
    backgroundColor: "rgb(6,67,158)",
    height: 150,
    width: 350,
    paddingTop: 45,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 3,
    marginTop: 40,
    marginBottom: 80,
    marginLeft: 10
  },
  memoryGames: {
    backgroundColor: "rgb(6,67,158)",
    height: 95,
    width: 280,
    paddingTop: 25,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 3,
    marginVertical: 30,
    marginLeft: 25
  },
  tilePic: {
    marginTop: 10,
    marginBottom: 70
  }
});
