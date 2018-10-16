import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import AppNavigator from "../navigation/AppNavigator";
import axios from "axios";
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
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        console.log(response.data);
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleSubmit() {
    axios
      .get(`http://localhost:3001/api/user/${id}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(response);
      });
  }

  handleNewUser() {
    axios
      .post("http://localhost:3001/api/user")
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // let userCheck = users.map((e, i) => {
    //   e.uname === this.state.username && e.password === this.state.password
    //     ? handleSubmit()
    //     : handleNewUser();
    // });

    return (
      <View style={styles.container}>
        <Text style={styles.loginTitle}>LOGIN</Text>

        <View>
          <TextInput
            onChange={e => this.handleUsername(e)}
            placeholder="USERNAME"
            style={styles.input}
          />
        </View>
        <View>
          <TextInput
            onChange={e => this.handlePassword(e)}
            placeholder="PASSWORD"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.buttonStyle}>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            title="START"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonStyle}>
          <Button
            onPress={() => this.props.navigation.navigate("Title")}
            title="BACK"
          />
        </TouchableOpacity>
      </View>
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
  buttonStyle: {
    backgroundColor: "rgb(6,67,158)",
    width: 250,
    height: 40,
    marginTop: 50,
    marginLeft: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5
  }
});

export default LoginScreen;
