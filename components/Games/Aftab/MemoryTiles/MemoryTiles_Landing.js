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
          <Text style={styles.title}>Ayumu</Text>
          <View>
            <TouchableOpacity>
              <Button
                onPress={() => this.props.navigation.navigate("MemoryTiles")}
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
          <View style={styles.container}>
            <Text style={styles.text}>Game Info:</Text>
            <Text style={styles.text}>
              Ayumu is a game that tests short term working memory along with
              mental focus
            </Text>
            <Text style={styles.text}>Instructions:</Text>
            <Text style={styles.text}>
              The game starts when you click the number "1"
            </Text>
            <Text style={styles.text}>
              -The goal is to click the tiles in order from 1 to 4, 1 to 8, or 1
              to 12 on the hardest level
            </Text>

            <Text style={styles.text}>
              -Its so easy a monkey could do it! GOODLUCK!
            </Text>
          </View>
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
    paddingVertical: 100
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 50
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  title: {
    color: "white",
    marginBottom: 20,
    fontSize: 50,
    fontWeight: "bold",
    letterSpacing: 1,
    textShadowColor: "#69AB38",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
    textShadowOffset: { width: 1, height: 0 }
  }
});
