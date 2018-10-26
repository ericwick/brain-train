import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import axios from "axios";
import AppNavigator from "../../../../navigation/AppNavigator";
import { Button } from "react-native-elements";

import { MonoText } from "../../../StyledText";

export default class Aftab extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      time: []
    };
  }

  render() {
    return (
      <ImageBackground
        source={require("../../../../assets/images/cloud-background.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Tile Tap</Text>
        <View>
         <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TileGame")}
          >

          <Text style={styles.start} > START</Text>
            <Image
              style={styles.settings}
              source={{
                uri: "https://cdn3.iconfinder.com/data/icons/pix-glyph-set/50/520626-gaming_remote-512.png"
              }}
            />
          </TouchableOpacity>
          </View>
          <Text> 
            Game Info:
          </Text> 
          <Text>
            Tile Tap is a game that tests speed along with mental focus
            </Text>
            <Text>
            Instructions: 
            </Text>
            <Text>
            -The game starts when you click the number "1" tile on the bottom row 
            -The goal is to go one by one until you hit 50 before time runs out 
            -Correct Tiles light up green while clicking the wrong tile will turn them all red and cause a game over. GOODLUCK!
          </Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ElasticStack")}
          >
          <Text> ElasticStack</Text>
            <Image
              style={styles.settings}
              source={{
                uri: "https://cdn3.iconfinder.com/data/icons/pix-glyph-set/50/520626-gaming_remote-512.png"
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
  login: {
    height: 25,
    width: 75,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "white"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  title: {
    marginTop: 40,
    fontSize: 65,
    color: "black",
    textAlign: "center"
  }, 
  start: { 
    fontSize: 40, 
    color: "green", 
    textAlign: "center"
  }
});
