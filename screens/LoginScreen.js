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

  handleLogin() {
    let { users, username, password } = this.state;
    var userCheck = () => {
      if (!users.length) {
        return null;
      } else {
        for (var i = 0; i < users.length; i++) {
          users[i].uname === username && users[i].password === password
            ? () => handleSubmit()
            : () => handleNewUser(username, password);
        }
      }
    };
    var handleSubmit = async () => {
      let id = 0;
      await users.map((e, i) => {
        if (username === e.uname) {
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
    };

    var handleNewUser = (uname, pword) => {
      axios
        .post("http://localhost:3001/api/user", { uname, pword })
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    };
    userCheck();
  }

  render() {
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

        <TouchableOpacity
          style={styles.startButtonStyle}
          onPress={this.handleLogin}
        >
          <Button
            title="START"
            onPress={() => this.props.navigation.navigate("Landing")}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButtonStyle}>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            title="BACK"
          />
        </TouchableOpacity>
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
