import React from "react";
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
import AppNavigator from "../navigation/AppNavigator";
import { AsyncStorage } from "react-native";
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

  async componentDidMount() {
    var currentUser = await AsyncStorage.getItem("user")
      .then(value => {
        this.setState({
          user: JSON.parse(value)
        });
        console.log(this.state.user);
      })
      .catch(err => {
        console.warn("Error loading current user");
      });
    axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.warn(err));
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.image}
            />
          </View>
          <View>
            <Button
              title="DAILY CHALLENGE"
              onPress={() => this.props.navigation.navigate("Home")}
              buttonStyle={{
                height: 250,
                width: 300,
                borderWidth: 5,
                borderRadius: 5,
                paddingTop: 18,
                marginTop: 30,
                marginBottom: 80,
                backgroundColor: "#9FEFA1",
                borderColor: "#03BD08"
              }}
              textStyle={{
                color: "#03BD08",
                fontSize: 25,
                letterSpacing: 1.3,
                textShadowColor: "#CFF7D0",
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
                onPress={() => this.props.navigation.navigate("TriviaGame")}
                buttonStyle={styles.firstButton}
                textStyle={styles.firstText}
              />
            </View>


            <View style={styles.container} >
            <Button
                title="Tile Counts "
                onPress={() => this.props.navigation.navigate("Aftab")}
                buttonStyle={styles.secondButton}
                textStyle={styles.secondText}
              />
        
            </View>
            <View style={styles.container} >
            <Button
                title="Memory Tiles "
                onPress={() => this.props.navigation.navigate("MemoryTiles")}
                buttonStyle={styles.secondButton}
                textStyle={styles.secondText}
              />
        
            </View>
            <View>
              <Button
                title="Eric's Games"
                onPress={() => this.props.navigation.navigate("Eric")}
                buttonStyle={styles.thirdButton}
                textStyle={styles.thirdText}
              />
            </View>
            <View>
              <Button
                title="SPEED"
                onPress={() => this.props.navigation.navigate("Home")}
                buttonStyle={styles.fourthButton}
                textStyle={styles.fourthText}
              />
            </View>
            <View>
              <Button
                title="MATH"
                onPress={() => this.props.navigation.navigate("Home")}
                buttonStyle={styles.fifthButton}
                textStyle={styles.fifthText}
              />
            </View>
          </View>
        </ScrollView>
        <Nav navigation={this.props.navigation} />
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  image: {
    resizeMode: "contain",
    width: 370,
    height: 200,
    transform: [{ rotate: "-2deg" }],
    marginRight: 12,
    top: 0,
    marginVertical: 50
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 110
  },
  homeTitle: {
    fontSize: 52,
    textAlign: "center",
    marginBottom: 15,
    color: "#FF7F7B",
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  firstButton: {
    width: 300,
    height: 100,
    marginVertical: 40,
    borderWidth: 5,
    borderRadius: 5,
    backgroundColor: "#FAA7A1",
    borderColor: "#FC1102"
  },
  firstText: {
    fontSize: 25,
    color: "#FC1102",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  gameContainer:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "#FCCE82",
    width: 300,
    height:135,
    marginVertical: 40,
    borderColor: "#FC9D01",
    borderWidth: 5,
    borderRadius: 5,
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10
  },
  content:{
    // alignItems: "center",
   },
  secondButton: {
    width: 300,
    height: 100,
    marginVertical: 40,
    borderWidth: 5,
    borderRadius: 5,
    backgroundColor: "#FCCE82",
    borderColor: "#FC9D01"
    // backgroundColor: "#FCCE82",
    // width: 80,
    // height:80,
    // marginTop: 5,
    // marginBottom: 5, 
    // marginVertical: 5,
    // marginRight: 10,
    // // marginVertical: 40,
    // borderColor: "#FC9D01",
    // borderWidth: 5,
    // borderRadius: 5, 
  },
  
  secondText: {
    fontSize: 25,
    color: "#FC9D01",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  thirdButton: {
    backgroundColor: "#FDFD01",
    width: 300,
    height: 100,
    marginVertical: 40,
    borderColor: "#B1B102",
    borderWidth: 5,
    borderRadius: 5
  },
  thirdText: {
    fontSize: 25,
    color: "#B1B102",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  fourthButton: {
    backgroundColor: "#7DDE77",
    width: 300,
    height: 100,
    marginVertical: 40,
    borderColor: "#0EC203",
    borderWidth: 5,
    borderRadius: 5
  },
  fourthText: {
    fontSize: 25,
    color: "#0EC203",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  fifthButton: {
    backgroundColor: "#8997FA",
    width: 300,
    height: 100,
    marginVertical: 40,
    borderColor: "#0321FA",
    borderWidth: 5,
    borderRadius: 5
  },
  fifthText: {
    fontSize: 25,
    color: "#0321FA",
    letterSpacing: 1,
    textShadowColor: "#66665F",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    fontWeight: "bold"
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
    marginTop: 50,
    marginBottom: 15,
    color: "#FD9B03",
    textShadowColor: "#F5D18C",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  },
  buttonText: {
    fontSize: 15,
    color: "#FF7F7B",
    letterSpacing: 1,
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 3,
    fontWeight: "bold"
  }, 
  // gameIcon: { 
  //   height: 40, 
  //   width: 40
  // }
});
