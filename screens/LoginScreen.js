import React, { Component } from "react";
import {
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ImageBackground
} from "react-native";
import { AsyncStorage } from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import axios from "axios";
import { Button } from "react-native-elements";

const { height, width } = Dimensions.get("window");

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      users: [],
      newUser: false,
      theme: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  async handleLogin() {
    var user = { username: this.state.username, password: this.state.password };
    var existingUser = await AsyncStorage.getItem("user");

    let newUser = JSON.parse(existingUser);
    if (!newUser) {
      newUser = [];
    }

    newUser.push(user);

    await AsyncStorage.setItem("user", JSON.stringify(newUser))
      .then(() => {
        console.warn("New user added successfully");
      })
      .catch(() => {
        console.warn("Error adding new user");
      });
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.image}
          />

          <TouchableHighlight onPress={() => this.colorChange()}>
            <TextInput
              onChangeText={text => this.setState({ username: text })}
              style={styles.username}
              value={!this.state.username ? null : this.state.username}
              placeholder="USERNAME"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholderTextColor="#077FDD"
              placeholderTextFontWeight="bold"
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.colorChange()}>
            <TextInput
              onChangeText={text => this.setState({ password: text })}
              style={styles.password}
              value={!this.state.password ? null : this.state.password}
              placeholder="PASSWORD"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholderTextColor="#84802C"
            />
          </TouchableHighlight>

          <TouchableOpacity>
            <Button
              onPress={() => {
                this.handleLogin;
                this.props.navigation.navigate("Home");
              }}
              title="START"
              buttonStyle={{
                backgroundColor: "#76FA4F",
                width: width - 65,
                height: height - height / 1.15,
                marginVertical: 10,
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

          <View contentContainerStyle={styles.container}>
            <Text style={styles.text}>Forgot your username or password?</Text>
            <TouchableOpacity
              onPress={() => console.warn("You've been reminded")}
            >
              <Text style={styles.text}>Yep, remind me.</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linebreak} />

          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Splash")}
              title="BACK"
              buttonStyle={{
                backgroundColor: "#F9D49B",
                width: width - 280,
                height: height - height / 0.8,
                marginTop: 10,
                borderColor: "#FD9B03",
                borderWidth: 3,
                borderRadius: 5
              }}
              textStyle={{
                color: "#FD9B03",
                fontSize: 18,
                letterSpacing: 1,
                fontWeight: "bold"
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
  container: {
    flex: 1,
    alignItems: "center"
  },
  linebreak: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginVertical: 15
  },
  image: {
    resizeMode: "contain",
    width: width - 65,
    height: height - height / 1.35,
    transform: [{ rotate: "-2deg" }],
    marginTop: (width / width) * 40,
    marginBottom: (width / width) * 20
  },
  username: {
    width: width - 65,
    height: height - height / 1.12,
    paddingLeft: 25,
    marginVertical: 10,
    color: "#077FDD",
    backgroundColor: "#91E1F8",
    borderRadius: 4,
    borderWidth: 5,
    borderColor: "#077FDD",
    textDecorationLine: "none"
  },
  password: {
    width: width - 65,
    height: height - height / 1.12,
    paddingLeft: 25,
    marginVertical: 10,
    color: "#84802C",
    backgroundColor: "#FEFE01",
    borderRadius: 4,
    borderWidth: 5,
    borderColor: "#ADAD01",
    textDecorationLine: "none"
  },
  loginTitle: {
    fontSize: 52,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 30,
    color: "#5ADB3A",
    textShadowColor: "#D8F1FA",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontWeight: "bold"
  },
  text: {
    color: "#077FDD",
    fontSize: 12,
    textShadowColor: "#D8F1FA",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4
  }
});

export default LoginScreen;
