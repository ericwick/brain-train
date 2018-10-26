import React, { Component } from "react";
import {
  Image,
  Platform,
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
    // on mount, pull up stored user and put them on state if it exists
    var userOnDevice = await AsyncStorage.getItem("user");
    var userOnDeviceParsed = JSON.parse(userOnDevice);
    // if there is no "user" in storage, the parsed users will be null. Set it to an empty array
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

    if (this.props.currentUser > 0) {
      AsyncStorage.setItem("user", JSON.stringify(credentials))
        .then(() => {
          // User has logged in successfully
          console.warn(`User "${this.state.username}" registered to device`);
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
    axios.post(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/user`)
    .then(response => console.log(response.data))
    .catch(err => `Error in handleRegister() - ${err}`);
    return;
  }

  renderButton() {
    if (this.state.renderLogin) {
      return (
        <TouchableOpacity>
          <Button
            onPress={() => this.handleLogin()}
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
      return(
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
            onPress={() => this.setState({renderLogin: !this.state.renderLogin}) }>
            <Text style={styles.text}>Register for a new account?</Text>
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
            />
          </TouchableHighlight>

          {this.renderButton()}

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
                width: 150,
                height: 55,
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
    width: 370,
    height: 200,
    transform: [{ rotate: "-2deg" }],
    marginRight: 12,
    marginVertical: 50
  },
  username: {
    width: 350,
    height: 80,
    paddingLeft: 15,
    marginVertical: 10,
    color: "#077FDD",
    backgroundColor: "#91E1F8",
    borderRadius: 4,
    borderWidth: 5,
    borderColor: "#077FDD",
    textDecorationLine: "none"
  },
  password: {
    width: 350,
    height: 80,
    paddingLeft: 15,
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
