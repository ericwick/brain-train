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
    await axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
        console.warn(this.state.users);
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
              username,
              password,
              uid
            })
            .then(response => {
              console.warn(response);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          axios
            .post("http://localhost:3001/api/user", { username, password, uid })
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
            placeholderTextColor="white"
          />
        </TouchableHighlight>
        <TouchableHighlight onPress={() => this.colorChange()}>
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            style={this.state.theme ? styles.input : styles.type}
            placeholder="PASSWORD"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="white"
          />
        </TouchableHighlight>

        <TouchableOpacity onPress={() => this.handleLogin()}>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            title="START"
            buttonStyle={{
              backgroundColor: "transparent",
              width: 350,
              height: 80,
              marginVertical: 10,
              borderColor: "white",
              borderWidth: 5,
              borderRadius: 5
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
              backgroundColor: "transparent",
              width: 170,
              height: 70,
              marginTop: 50,
              borderColor: "white",
              borderWidth: 3,
              borderRadius: 5
            }}
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
    marginVertical: 40
  },
  input: {
    width: 350,
    height: 60,
    paddingLeft: 15,
    marginVertical: 10,
    color: "#474C5D",
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "white"
  },
  type: {
    width: 350,
    height: 60,
    paddingLeft: 15,
    marginVertical: 10,
    color: "white",
    backgroundColor: "#474C5D",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "white"
  },
  loginTitle: {
    fontSize: 42,
    textAlign: "center",
    marginTop: 80,
    marginBottom: 30,
    color: "white"
  },
  text: {
    color: "white",
    fontSize: 12
  }
});

export default LoginScreen;
