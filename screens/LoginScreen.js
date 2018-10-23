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
  }

  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    AsyncStorage.getItem("username")
      .then(value => {
        this.setState({ username: value });
      })
      .done();
    axios
      .get(`http://localhost:3001/api/users`)
      .then(response => {
        console.warn("CDM ALL USERS", response.data);
        this.setState({
          users: response.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  saveUser() {
    AsyncStorage.setItem("username", value);
    this.setState({ username: value });
  }

  // handleLogin() {
  //   let { users, username, password } = this.state;

  //   if (!users.length) {
  //     return null;
  //   } else {
  //     users.map((e, i) => {
  //       if (username === e.username) {
  //         let { uid } = e;
  //         axios
  //           .get("http://localhost:3001/api/user/username", {
  //             username
  //           })
  //           .then(response => {
  //             console.warn(response);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       } else {
  //         axios
  //           .post("http://localhost:3001/api/user", { username, password })
  //           .then(response => {
  //             console.warn(response);
  //           })
  //           .catch(err => {
  //             console.log(err);
  //           });
  //       }
  //     });
  //     axios
  //     axios.get(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/user/${id}`)
  //       .then(response => {
  //         // console.log(response);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };

  //   var handleNewUser = (uname, pword) => {
  //     axios.post(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/user`, { uname, pword })
  //       .then(response => {
  //         // console.log(response);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   };
  //   userCheck();
  // }

  render() {
    // sets the value of whatever you want and stores it
    AsyncStorage.setItem("username", this.state.username);

    // gets the value or whatever you want from storage
    AsyncStorage.getItem("username")
      .then(value => {
        this.setState({ username: value });
      })
      .done();

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
              placeholderTextColor="#8E8E8A"
            />
          </TouchableHighlight>

          <TouchableOpacity>
            <Button
              onPress={
                this.state.username && this.state.password
                  ? this.componentWillMount
                  : this.saveUser
              }
              title="START"
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
    color: "#E9F802",
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
