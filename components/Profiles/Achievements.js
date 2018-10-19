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
import AppNavigator from "../../navigation/AppNavigator";
import axios from "axios";
import Nav from "../NavBar/Nav";

// import { MonoText } from "../components/StyledText";
import { Button, Tile } from "react-native-elements";
// import PopupModal from "../components/popupModal/popupModal";

export default class Achievements extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View contentContainerStyle={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.container}>
            <Text style={styles.homeTitle}>Achievements</Text>
          </View>

          <View>
            <Button
              title="DAILY CHALLENGE"
              onPress={() => this.props.navigation.navigate("Home")}
              buttonStyle={{
                backgroundColor: "transparent",
                height: 250,
                width: 350,
                marginLeft: 18,
                borderColor: "white",
                borderWidth: 2,
                borderRadius: 3,
                paddingTop: 18,
                marginTop: 30,
                marginBottom: 80
              }}
            />
          </View>

          <View style={styles.container}>
            <Image
              source={require("../../assets/images/timeAchieve.png")}
              style={styles.pic}
            />
          </View>

          <View style={styles.container}>
            <Text style={styles.achievement}>Brain Lather</Text>
            <Text style={styles.description}>Two Total Hours Played</Text>
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
    paddingTop: 30,
    paddingBottom: 300
  },
  homeTitle: {
    fontSize: 52,
    color: "white",
    marginTop: 45,
    marginBottom: 15
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  pic: {
    width: 80,
    height: 80
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
    color: "white"
  },
  tilePic: {
    marginTop: 10,
    marginBottom: 70
  }
});

// <View contentContainerStyle={styles.container}>
//   <ScrollView style={{ minHeight: 0, maxHeight: 5000 }}>
//     <View contentContainerStyle={styles.container}>
//       <Text style={styles.title}> ACHIEVEMENTS </Text>
//     </View>

//     {/* <TouchableOpacity style={styles.pic}>
//       <Image source={require("../../assets/images/timeAchieve.png")} />
//     </TouchableOpacity> */}

//     <View contentContainerStyle={styles.container}>
//       <Text style={styles.achievement}>Brain Lather</Text>
//     </View>

//     <View contentContainerStyle={styles.container}>
//       <Text style={styles.description}>Two Total Hours Played</Text>
//     </View>
//   </ScrollView>
//   <View style={styles.nav}>
//     <Nav navigation={this.props.navigation} />
//   </View>
// </View>
