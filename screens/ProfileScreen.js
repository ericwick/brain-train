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
import AppNavigator from "../navigation/AppNavigator";
import { Button, Avatar } from "react-native-elements";
import Nav from "../components/NavBar/Nav";

import { MonoText } from "../components/StyledText";


export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
    this.buttonCheck = this.buttonCheck.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  buttonCheck() {
    console.warn("All good.");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.profileTitle}>***USERNAME***</Text>

          <Image
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
            }}
            style={styles.image}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("EditProfile")}
          >
          {/* <Text> Edit Profile </Text> */}
            <Image
              style={styles.settings}
              source={{
                uri: "https://d30y9cdsu7xlg0.cloudfront.net/png/6052-200.png"
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserStats")}
          >
          {/* <Text> Edit Profile </Text> */}
            <Image
              style={styles.settings}
              source={{
                uri: "https://cdn3.iconfinder.com/data/icons/e-commerce-8/91/stats-512.png"
              }}
            />
          </TouchableOpacity>

          <View style={styles.linebreak} />

          <Text style={styles.stats}>***Users' Personal Stats Here***</Text>
        </ScrollView>
        <Nav navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3783F5"
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  profileTitle: {
    marginTop: 50,
    fontSize: 47,
    color: "black",
    textAlign: "center"
  },
  linebreak: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginVertical: 60
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 80
  },
  stats: {
    fontSize: 40,
    textAlign: "center"
  },
  settingsContainer:{

  },
  settings: {
    width: 40,
    height: 40,
    marginTop: 15
  }
});
