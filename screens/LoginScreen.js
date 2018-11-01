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
// import { CLIENT_RENEG_LIMIT } from "tls";
import { connect } from "react-redux";
import { attemptLogin, attemptRegister } from "../redux/reducer";

const { height, width } = Dimensions.get("window");

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      theme: false,
      renderLogin: true,
      theme: false
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    var userOnDevice = await AsyncStorage.getItem("user");
    var userOnDeviceParsed = JSON.parse(userOnDevice);
    if (!userOnDeviceParsed) {
      userOnDeviceParsed = [];
    } else {
      let { username, password } = userOnDeviceParsed;
      this.setState({ username, password });
    }
  }

  async handleLogin() {
    var credentials = {
      username: this.state.username,
      password: this.state.password
    };

    await this.props.attemptLogin(credentials);
    console.log("this.props.currentUser", this.props.currentUser);

    if (this.props.currentUser > 0) {
      AsyncStorage.setItem("user", JSON.stringify(credentials))
        .then(() => {
          // console.warn(`${this.state.user} registered to device`);
          this.props.navigation.navigate("Home");
        })
        .catch(() => {
          console.warn("Error adding new user");
        });
    } else {
      console.warn("Incorrect credentials");
    }
  }

  handleRegister() {
    var credentials = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post(
        `http://${
          __DEV__
            ? Platform.OS === "ios"
              ? "localhost"
              : "172.31.99.105"
            : production.url
        }:3001/api/user`,
        credentials
      )
      .then(response => {
        // If the user successfully registers, log them in and the login function will redirect to the Home page
        this.handleLogin();
      })
      .catch(err => {
        if (err.response.status == 409) {
          console.warn("A user already exists by this username");
        }
        console.log(`Error in handleRegister() - ${err.response.status}`);
      });
    return;
  }

  renderButton() {
    if (this.state.renderLogin) {
      return (
        <TouchableOpacity>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            // onPress={() => this.handleLogin()}
            title="LOGIN"
            buttonStyle={{
              backgroundColor: "#76FA4F",
              width: 350,
              height: 100,
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
      );
    } else {
      return (
        <TouchableOpacity>
          <Button
            onPress={() => this.handleRegister()}
            title="REGISTER"
            buttonStyle={{
              backgroundColor: "#F9524F",
              width: 350,
              height: 100,
              marginVertical: 10,
              borderColor: "#B50D01",
              borderWidth: 5,
              borderRadius: 7
            }}
            textStyle={{
              color: "white",
              fontSize: 35,
              letterSpacing: 2,
              fontWeight: "bold",
              textShadowColor: "#C60703",
              textShadowRadius: 6,
              textShadowOffset: { width: -3, height: 3 }
            }}
          />
        </TouchableOpacity>
      );
    }
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

          <TouchableOpacity
            onPress={() =>
              this.setState({ renderLogin: !this.state.renderLogin })
            }
          >
            <Text style={[styles.text, { marginBottom: 10 }]}>
              {this.state.renderLogin
                ? "Register for a new account?"
                : "Go back to login page"}
            </Text>
          </TouchableOpacity>

          <TouchableHighlight>
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
          <TouchableHighlight>
            <TextInput
              onChangeText={text => this.setState({ password: text })}
              style={styles.password}
              value={!this.state.password ? null : this.state.password}
              placeholder="PASSWORD"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              placeholderTextColor="#84802C"
              secureTextEntry={true}
            />
          </TouchableHighlight>

          {this.renderButton()}

          {!this.state.password.length ? (
            // Render the clickable phrase only if the password field is empty?
            <View contentContainerStyle={styles.container}>
              <TouchableOpacity
                onPress={() => console.warn("You've been reminded")}
              >
                <Text style={styles.text}>What was my password again?</Text>
              </TouchableOpacity>
            </View>
          ) : null}

          <View style={styles.linebreak} />

          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Splash")}
              title="BACK"
              buttonStyle={{
                backgroundColor: "#F9D49B",
                width: width - 250,
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

const mapStateToProps = state => state;
export default connect(
  mapStateToProps,
  { attemptLogin, attemptRegister }
)(LoginScreen);
