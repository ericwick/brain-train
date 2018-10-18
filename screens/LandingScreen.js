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
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { Input } from "react-native-elements";
import { Button, Tile } from "react-native-elements";
import PopupModal from "../components/popupModal/popupModal";

export default class LandingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  // We'll grab all users from reducer once its set up

  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.welcomeImage}
            />
          </View>

          <View>
            <Button
              title="DAILY CHALLENGE"
              onPress={() => this.props.navigation.navigate("Landing")}
              buttonStyle={{
                backgroundColor: "#06439E",
                height: 150,
                width: 350,
                marginLeft: 18,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 3,
                paddingTop: 18,
                marginTop: 30,
                marginBottom: 80
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

          <View style={styles.gamesContainer}>
            <Text style={styles.gamesTitle}>GAMES </Text>
            <View />

            <View>
              <Button
                title="Anthony's Games"
                onPress={() => this.props.navigation.navigate("Anthony")}
                buttonStyle={{
                  backgroundColor: "#06439E",
                  width: 280,
                  height: 95,
                  marginVertical: 30,
                  marginLeft: 28,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5
                }}
              />
            </View>
            <View>
              <Button
                title="Aftab's Games"
                onPress={() => this.props.navigation.navigate("Aftab")}
                buttonStyle={{
                  backgroundColor: "#06439E",
                  width: 280,
                  height: 95,
                  marginVertical: 30,
                  marginLeft: 28,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5
                }}
              />
            </View>
            <View>
              <Button
                title="Eric's Games"
                onPress={() => this.props.navigation.navigate("Eric")}
                buttonStyle={{
                  backgroundColor: "#06439E",
                  width: 280,
                  height: 95,
                  marginVertical: 30,
                  marginLeft: 28,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5
                }}
              />
            </View>
            <View>
              <Button
                title="SPEED"
                onPress={() => this.props.navigation.navigate("Landing")}
                buttonStyle={{
                  backgroundColor: "#06439E",
                  width: 280,
                  height: 95,
                  marginVertical: 30,
                  marginLeft: 28,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5
                }}
              />
            </View>
            <View>
              <Button
                title="MATH"
                onPress={() => this.props.navigation.navigate("Landing")}
                buttonStyle={{
                  backgroundColor: "#06439E",
                  width: 280,
                  height: 95,
                  marginTop: 30,
                  marginBottom: 130,
                  marginLeft: 28,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 5
                }}
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
    flexDirection: "column",
    backgroundColor: "#3783F5"
  },
  contentContainer: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center"
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
    fontSize: 35,
    textAlign: "center",
    marginRight: 20
  },
  gamesContainer: {
    marginLeft: 20
  },
  tilePic: {
    marginTop: 10,
    marginBottom: 70
  }
});
