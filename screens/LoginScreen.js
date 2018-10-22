import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput
} from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import axios from "axios";
import { Button } from "react-native-elements";

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

  async componentDidMount() {
    await fetch("http://localhost:3001/api/users")
      .then(response => {
        // console.warn("ALL USERS", response);
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLogin() {
    let { users, username, password } = this.state;

    if (!users.length) {
      return null;
    } else {
      users.map((e, i) => {
        if (username === e.username) {
          let { uid } = e;
          axios
            .get("http://localhost:3001/api/user/username", {
              username
            })
            .then(response => {
              console.warn(response);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          axios
            .post("http://localhost:3001/api/user", { username, password })
            .then(response => {
              console.warn(response);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }

  colorChange() {
    this.setState({
      theme: !this.state.theme
    });
  }

  render() {
    // console.warn("ALL USERS", this.state.users);
    // console.warn("USERNAME", this.state.username);
    // console.warn("PASSWORD", this.state.password);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.loginTitle}>Brain Train</Text>

        <TouchableHighlight onPress={() => this.colorChange()}>
          <TextInput
            onChangeText={text => this.setState({ username: text })}
            style={this.state.theme ? styles.input : styles.type}
            placeholder="USERNAME"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="#FF7F7B"
            placeholderTextFontWeight="bold"
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.colorChange()}>
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            style={this.state.theme ? styles.input : styles.type}
            placeholder="PASSWORD"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="#FF7F7B"
          />
        </TouchableHighlight>

        <TouchableOpacity>
          <Button
            onPress={() => {
              this.handleLogin();
              this.props.navigation.navigate("Home");
            }}
            title="START"
            buttonStyle={{
              backgroundColor: "#FCE1E0",
              width: 350,
              height: 100,
              marginVertical: 10,
              borderColor: "#FF7F7B",
              borderWidth: 5,
              borderRadius: 7
            }}
            textStyle={{
              color: "#FF7F7B",
              fontSize: 25,
              letterSpacing: 2,
              textShadowColor: "white",
              textShadowOffset: { width: 1.5, height: 2 },
              textShadowRadius: 30,
              fontWeight: "bold"
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
              backgroundColor: "#FCE1E0",
              width: 150,
              height: 55,
              marginTop: 10,
              borderColor: "#FF7F7B",
              borderWidth: 3,
              borderRadius: 5
            }}
            textStyle={{ color: "#FF7F7B", fontSize: 18, letterSpacing: 1 }}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#474C5D",
    justifyContent: "center",
    alignItems: "center"
  },
  linebreak: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    marginVertical: 15
  },
  input: {
    width: 350,
    height: 80,
    paddingLeft: 15,
    marginVertical: 10,
    color: "#FF7F7B",
    backgroundColor: "#FCE1E0",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#FF7F7B"
  },
  type: {
    width: 350,
    height: 80,
    paddingLeft: 15,
    marginVertical: 10,
    color: "#FF7F7B",
    backgroundColor: "#FCE1E0",
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#FF7F7B"
  },
  loginTitle: {
    fontSize: 52,
    textAlign: "center",
    marginTop: 60,
    marginBottom: 30,
    color: "#FF7F7B",
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  text: {
    color: "white",
    fontSize: 12,
    textShadowColor: "#FF7F7B",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4
  }
});

export default LoginScreen;
