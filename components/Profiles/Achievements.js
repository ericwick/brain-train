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

          <View style={styles.container}>
            <View style={styles.achieveIcon}>
              <Image
                source={require("../../assets/images/timeAchieve.png")}
                style={styles.pic}
              />
            </View>
            <View style={styles.container}>
              <Text style={styles.achievement}>Brain Lather</Text>
              <Text style={styles.description}>Two Total Hours Played</Text>
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  achieveIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#FCE1E0",
    borderColor: "#FF7F7B",
    borderRadius: 50,
    paddingTop: 11,
    paddingLeft: 13,
    marginLeft: 20
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
  pic: {
    width: 74,
    height: 74
  },
  achievement: {
    fontSize: 18,
    color: "white",
    paddingHorizontal: 10
  },
  description: {
    fontSize: 15,
    color: "white"
  }
});
