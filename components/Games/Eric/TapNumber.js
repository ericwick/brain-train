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
import { Button } from "react-native-elements";
import axios from "axios";
import AppNavigator from "../../../navigation/AppNavigator";
import Nav from "../../NavBar/Nav";

export default class TapNumber extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/mobileGUI/sky_bg.png")}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>Tap Number</Text>

          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("TapNumberGame")}
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
          <View style={styles.container}>
            <Text style={styles.objective}>Objective:</Text>
            <Text style={styles.text}>
              * The time will start when you press START *
            </Text>
            <Text style={styles.text}>
              You have 30 seconds to tap the tiles as fast as you can starting
              with the smallest number until only the largest number remains.
            </Text>
            <Text style={styles.text}>
              After clearing the screen of all the tiles, a new board will
              appear. As you continue to clear tiles off of the screen, the
              level will increase as will the number of tiles and the number
              range.
            </Text>
            <Text style={styles.text}>
              Get through as many rounds as possible in 30 seconds!
            </Text>
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingBottom: 50
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100
  },
  objective: {
    fontSize: 40,
    marginVertical: 25,
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 12,
    textShadowOffset: { width: -1, height: 1 }
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
  title: {
    color: "white",
    marginBottom: 20,
    fontSize: 60,
    fontWeight: "bold",
    letterSpacing: 1,
    textShadowColor: "#69AB38",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 20
  }
});
