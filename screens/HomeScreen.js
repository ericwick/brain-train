import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../navigation/AppNavigator";
import axios from "axios";
import Nav from "../components/NavBar/Nav";

import { MonoText } from "../components/StyledText";
import { Button, Tile } from "react-native-elements";
import PopupModal from "../components/popupModal/popupModal";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      users: []
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    axios.get("http://localhost:3001/api/user/current").then(response => {
      console.warn(response.data);
      this.setState({
        user: response.data
      });
    });
  }

  render() {
    return (
      <View contentContainerStyle={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {/* <View style={styles.welcomeContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.welcomeImage}
            />
          </View> */}
          <View style={styles.container}>
            <Text style={styles.homeTitle}>Brain Train</Text>
          </View>

          <View>
            <Button
              title="DAILY CHALLENGE"
              onPress={() => this.props.navigation.navigate("Home")}
              buttonStyle={{
                height: 250,
                width: 300,
                marginLeft: 18,
                borderWidth: 2,
                borderRadius: 3,
                paddingTop: 18,
                marginTop: 30,
                marginBottom: 80,
                backgroundColor: "#FCE1E0",
                borderColor: "#FF7F7B"
              }}
              textStyle={{
                color: "#FF7F7B",
                fontSize: 25,
                letterSpacing: 2,
                textShadowColor: "white",
                textShadowOffset: { width: 1.5, height: 2 },
                textShadowRadius: 4,
                fontWeight: "bold"
              }}
            />
          </View>

          <View style={styles.tilePic}>
            <Tile
              imageSrc={require("../assets/images/Brain.jpg")}
              title="Our Mission at Brain Train is to provide...some shit goes here "
              featured
              caption="Some Caption Text"
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.gamesTitle}>GAMES </Text>
          </View>

          <View style={styles.container}>
            <View>
              <Button
                title="Anthony's Games"
                onPress={() => this.props.navigation.navigate("Anthony")}
                buttonStyle={styles.buttons}
                textStyle={styles.buttonText}
              />
            </View>
            <View>
              <Button
                title="Aftab's Games"
                onPress={() => this.props.navigation.navigate("Aftab")}
                buttonStyle={styles.buttons}
                textStyle={styles.buttonText}
              />
            </View>
            <View>
              <Button
                title="Eric's Games"
                onPress={() => this.props.navigation.navigate("Eric")}
                buttonStyle={styles.buttons}
                textStyle={styles.buttonText}
              />
            </View>
            <View>
              <Button
                title="SPEED"
                onPress={() => this.props.navigation.navigate("Home")}
                buttonStyle={styles.buttons}
                textStyle={styles.buttonText}
              />
            </View>
            <View>
              <Button
                title="MATH"
                onPress={() => this.props.navigation.navigate("Home")}
                buttonStyle={styles.lastButton}
                textStyle={styles.buttonText}
              />
            </View>
          </View>
        </ScrollView>
        <Nav navigation={this.props.navigation} />
      </View>
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
  contentContainer: {
    backgroundColor: "#474C5D",
    paddingTop: 30
  },
  homeTitle: {
    fontSize: 52,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 15,
    color: "#FF7F7B",
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 380,
    height: 320,
    resizeMode: "contain"
  },
  buttons: {
    width: 280,
    height: 95,
    marginVertical: 30,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "#FCE1E0",
    borderColor: "#FF7F7B"
  },
  lastButton: {
    backgroundColor: "#FCE1E0",
    width: 280,
    height: 95,
    marginTop: 30,
    marginBottom: 130,
    borderColor: "#FF7F7B",
    borderWidth: 2,
    borderRadius: 5
  },
  dailyChallenge: {
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    height: 75,
    width: 250,
    marginBottom: 20
  },
  missionStatement: {
    position: "relative",
    borderColor: "black",
    borderWidth: 1,
    height: 75,
    width: 250,
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20
  },
  gamesTitle: {
    fontSize: 42,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 15,
    color: "#FF7F7B",
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  tilePic: {
    marginTop: 10,
    marginBottom: 70
  },
  buttonText: {
    fontSize: 15,
    color: "#FF7F7B",
    letterSpacing: 1,
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  }
});
