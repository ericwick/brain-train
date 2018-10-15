import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput
} from "react-native";
import AppNavigator from "../navigation/AppNavigator";

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LOGIN</Text>

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

        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Landing")}
            title="LandingScreen"
          >
            <Button title="Submit" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            title="HomeScreen"
            style={styles.button}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fa4100"
  },
  input: {
    width: 150,
    marginVertical: 50,
    textAlign: "center"
  },
  button: {
    width: 200,
    marginTop: 300
  },
  title: {
    fontSize: 32,
    fontWeight: "bold"
  }
});

export default LoginScreen;
