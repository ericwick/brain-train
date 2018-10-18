import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import axios from 'axios';
import AppNavigator from "../navigation/AppNavigator";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { getUsers } from "../redux/reducer";

import { MonoText } from "../components/StyledText";

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    console.log('HIT', __DEV__);
    this.props.getUsers();
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/cloud-background.jpg")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Brain Train</Text>

          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Login")}
              title="PLAY"
              buttonStyle={{
                backgroundColor: "#06439E",
                width: 300,
                height: 80,
                marginTop: 50,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5
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
  login: {
    height: 25,
    width: 75,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    borderStyle: "solid",
    backgroundColor: "white"
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  title: {
    // fontFamily: "sans-serif-medium",
    marginTop: 40,
    fontSize: 65,
    color: "black",
    textAlign: "center"
  }
});

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getUsers })(HomeScreen);