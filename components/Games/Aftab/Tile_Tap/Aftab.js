import React, { Component } from "react";
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
import axios from "axios";
import AppNavigator from "../../../../navigation/AppNavigator";
import { Button } from "react-native-elements";

import { MonoText } from "../../../StyledText";

const { height, width } = Dimensions.get("window");

export default class Aftab extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      time: []
    };
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ImageBackground
        source={require("../../../../assets/images/cloud-background.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.tileTitle}>Tile Count</Text>
          <View>
            <TouchableOpacity>
              <Button
                onPress={() => this.props.navigation.navigate("TileGame")}
                title="START"
                buttonStyle={{
                  backgroundColor: "#76FA4F",
                  width: 350,
                  height: 100,
                  marginVertical: 25,
                  borderColor: "#2BB502",
                  borderWidth: 5,
                  borderRadius: 7
                }}
                textStyle={{
                  color: "white",
                  fontSize: 35,
                  letterSpacing: 2,
                  fontWeight: "bold",
                  textShadowColor: "#30C804",
                  textShadowRadius: 6,
                  textShadowOffset: { width: -3, height: 3 }
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.directions}>
            <Text style={styles.text}>Game Info:</Text>
            <Text style={styles.text}>
              Tile Tap is a game that tests speed along with mental focus
            </Text>
            <Text style={styles.text}>Instructions:</Text>
            <Text style={styles.text}>
              -The game starts when you click the number "1" tile on the bottom
              row -The goal is to go one by one until you hit 50 before time
              runs out -Correct Tiles light up green while clicking the wrong
              tile will turn them all red and cause a game over. GOOD LUCK!
            </Text>
          </View>

          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ElasticStack")}
          >
            <Image
              style={styles.settings}
              source={{
                uri:
                  "https://cdn3.iconfinder.com/data/icons/pix-glyph-set/50/520626-gaming_remote-512.png"
              }}
            />
          </TouchableOpacity> */}
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
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  directions: {
    flex: 1,
    marginHorizontal: width * 0.05
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
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
    textShadowOffset: { width: 1, height: 0 }
  },
  tileTitle: {
    fontSize: 68,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 15,
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  }
});
