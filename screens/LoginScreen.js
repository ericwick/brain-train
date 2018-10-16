import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import axios from "axios";
// import LandingScreen from "./LandingScreen";
// import { Button, Input } from "react-native-elements";
// import Icon from "react-native-vector-icons";

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      users: [],
      newUser: false
    };
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentDidMount() {
    await axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit(id) {
    users.map((e, i) => {
      if (this.state.username === e.uname) {
        id = e.id;
      }
    });
    axios
      .get(`http://localhost:3001/api/user/${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleNewUser() {
    let { username, password } = this.state;
    axios
      .post("http://localhost:3001/api/user", { username, password })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleLogin() {
    if (!this.state.users.length) {
      return null;
    } else {
      this.state.users.map((e, i) => {
        e.uname === this.state.username && e.password === this.state.password
          ? () => this.handleSubmit()
          : () => this.handleNewUser();
      });
    }
    function login() {
      this.props.navigation.navigate("Landing");
    }
    login();
  }

  render() {
    console.log(this.state.username, "USERNAME");
    console.log(this.state.password, "PASSWORD");
    console.log(this.state.users, "USERS");
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.loginTitle}>LOGIN</Text>

        <View>
          <TextInput
            onChangeText={text => this.setState({ username: text })}
            placeholder="USERNAME"
            style={styles.input}
            autoCapitalize="none"
          />
        </View>
        <View>
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            placeholder="PASSWORD"
            style={styles.input}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.startButtonStyle}>
          <Button onPress={() => this.handleLogin()} title="START" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButtonStyle}>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            title="BACK"
          />
        </TouchableOpacity>

        {/* <LandingScreen
          style={styles.landing}
          username={this.state.username}
          password={this.state.password}
        /> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3783F5"
  },
  input: {
    width: 300,
    height: 30,
    textAlign: "center",
    marginVertical: 45,
    marginLeft: 30,
    backgroundColor: "#AECEF3",
    borderRadius: 7,
    borderColor: "transparent",
    borderWidth: 0
  },
  button: {
    width: 200,
    marginTop: 300
  },
  loginTitle: {
    fontSize: 32,
    textAlign: "center",
    marginTop: 30
  },
  backButtonStyle: {
    backgroundColor: "rgb(6,67,158)",
    width: 250,
    height: 40,
    marginTop: 50,
    marginLeft: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5
  },
  startButtonStyle: {
    backgroundColor: "rgb(6,67,158)",
    width: 250,
    height: 80,
    paddingTop: 20,
    marginTop: 20,
    marginLeft: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5
  },
  landing: {
    display: "none"
  }
});

export default LoginScreen;
