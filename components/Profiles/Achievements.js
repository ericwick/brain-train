import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../../navigation/AppNavigator";
import axios from "axios";
import Nav from "../NavBar/Nav";
import { AsyncStorage } from "react-native";

import { Button, Tile } from "react-native-elements";

export default class Achievements extends React.Component {
  constructor() {
    super();
    this.state = {
      user: [],
      users: []
    };
    // this.buttonCheck = this.buttonCheck.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    var currentUser = await AsyncStorage.getItem("user")
      .then(value => {
        this.setState({
          user: JSON.parse(value)
        });
      })
      .catch(err => {
        console.warn("Error loading current user");
      });
    axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.warn(err));
  }

  render() {
    var currentUser = [];

    for (var i = 0; i < this.state.users.length; i++) {
      if (this.state.users[i].username === this.state.user[0].username) {
        currentUser = this.state.users[i];
        console.warn(this.state.user[0].username, "USER USERNAME");
      }
    }

    return (
      <ImageBackground
        source={require("../../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.homeTitle}>Achievements</Text>
          </View>

          <View style={styles.container}>
            <View style={styles.achieveIcon}>
              <Image
                source={require("../../assets/images/timeAchieve.png")}
                style={styles.pic}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.achievement}>Brain Lather</Text>
              <Text style={styles.description}>Two Total Hours Played</Text>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.perfectIcon}>
              <Image
                source={require("../../assets/images/perfectScoreIcon.png")}
                style={styles.pic}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.achievement}>Perfect Score</Text>
              <Text style={styles.description}>Zero Errors in One Round</Text>
            </View>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10
  },
  longContainer: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  achieveIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#FA5F4A",
    borderColor: "#FF7F7B",
    borderRadius: 50,
    paddingTop: 11,
    paddingLeft: 13,
    marginLeft: 20
  },
  perfectIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#8EE4FB",
    borderColor: "#FF7F7B",
    borderRadius: 50,
    paddingTop: 14,
    paddingLeft: 11,
    marginLeft: 20
  },
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 300
  },
  homeTitle: {
    fontSize: 52,
    color: "#FB1203",
    marginTop: 45,
    marginBottom: 32,
    textShadowColor: "#FB948E",
    textShadowRadius: 6,
    textShadowOffset: { width: -2, height: 2 }
  },
  pic: {
    width: 74,
    height: 74
  },
  achievement: {
    fontSize: 30,
    color: "black",
    paddingHorizontal: 5
  },
  description: {
    fontSize: 12,
    color: "black"
  }
});
