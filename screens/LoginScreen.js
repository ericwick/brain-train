import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput
} from "react-native";

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
        <Text>This is the Login Page</Text>

        <TextInput
          onChange={e => this.handleUsername(e)}
          placeholder="USERNAME"
          style={styles.input}
        />
        <TextInput
          onChange={e => this.handlePassword(e)}
          placeholder="PASSWORD"
          style={styles.input}
        />

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
    textAlign: "center",
    float: "center"
  },
  button: {
    width: 200,
    marginTop: 300
  }
});

export default LoginScreen;
