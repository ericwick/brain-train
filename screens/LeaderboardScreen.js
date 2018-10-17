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
import { Button } from "react-native-elements";
import Nav from "../components/NavBar/Nav";

import { MonoText } from "../components/StyledText";

export default class LeaderboardScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/time")
      .then(response => {
        console.log("response.data", response);
      })
      .catch(err => console.log("err", err));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.profileTitle}>LEADERBOARD</Text>

          <Image
            source={require("../assets/images/trophy.png")}
            style={styles.image}
          />

          <View style={styles.linebreak} />

          <Text style={styles.stats}>***Global Stats Here***</Text>
        </ScrollView>
        <Nav navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#3783F5"
  },
  contentContainer: {
    paddingTop: 30
  },
  profileTitle: {
    marginTop: 50,
    fontSize: 47,
    color: "black",
    textAlign: "center"
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 50,
    marginLeft: 130
  },
  linebreak: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginVertical: 60
  },
  stats: {
    fontSize: 40,
    textAlign: "center"
  }
});
