import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
import { WebBrowser } from "expo";
import axios from "axios";
import AppNavigator from "../navigation/AppNavigator";
import { Button, Avatar } from "react-native-elements";
import Nav from "../components/NavBar/Nav";
import { AsyncStorage } from "react-native";
import RadarChart from "../components/Charts/RadarChart";

import { MonoText } from "../components/StyledText";

const { height, width } = Dimensions.get("window");

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      data: [],
      users: [],
      tableHead: ["Game", "Score"],
      tableData: [
        ["game0", 234],
        ["game1", 604],
        ["game2", 641],
        ["game3", 473],
        ["game4", 301]
      ]
    };
    // this.buttonCheck = this.buttonCheck.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  async componentDidMount() {
    var currentUser = await AsyncStorage.getItem("user")
      .then(value => {
        console.log("value", value);
        console.log("JSON.parse(value)", JSON.parse(value));
        this.setState({
          user: JSON.parse(value)
        });
      })
      .catch(err => {
        console.warn("Error loading current user");
      });
    axios
      .get(
        `http://${
          __DEV__
            ? Platform.OS === "ios"
              ? "localhost"
              : "172.31.99.105"
            : production.url
        }:3001/api/users`
      )
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.warn(err));
  }

  render() {
    var currentUser = [];

    for (var i = 0; i < this.state.users.length; i++) {
      if (
        this.state.users.length &&
        this.state.users[i].username === this.state.user.username
      ) {
        currentUser = this.state.users[i];
        console.warn(this.state.user.username, "USER USERNAME");
      }
    }

    const table = this.state.data.map((e, i, arr) => {
      return [e.game_name, e.score];
    });
    const chartName = this.state.data.map((e, i, arr) => {
      return e.game_name;
    });
    const chartScore = this.state.data.map((e, i, arr) => {
      return e.score;
    });
    console.log(chartScore);
    let sanitizedInput = table.filter((e, i, self) => i === self.indexOf(e));
    console.log(table);
    const tabledata = [["gid", 234], ["game1", 604]];

    return (
      <ImageBackground
        source={require("../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.profileTitle}>{currentUser.username}</Text>

          <Image
            source={require("../assets/images/avatarIcon.png")}
            style={styles.image}
          />
          <View style={styles.icons}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("EditProfile")}
            >
              <Image
                style={styles.edit}
                source={require("../assets/images/edit.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("UserStats")}
            >
              <Image
                style={styles.settings}
                source={{
                  uri:
                    "https://cdn3.iconfinder.com/data/icons/e-commerce-8/91/stats-512.png"
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Image
              source={require("../assets/images/railroadTracks.png")}
              style={styles.linebreak}
            />
          </View>

          <Text style={styles.stats}>Best Scores</Text>
          <View contentContainerStyle={styles.tableContainer}>
            <Table
              style={styles.table}
              borderStyle={{
                borderWidth: 2,
                borderColor: "#FC0C01",
                borderRadius: 3
              }}
            >
              <Row
                data={this.state.tableHead}
                style={styles.head}
                textStyle={styles.textHead}
              />
              <Rows data={sanitizedInput} textStyle={styles.text} />
            </Table>
          </View>

          <View>
            <Image
              source={require("../assets/images/railroadTracks.png")}
              style={styles.linebreak}
            />
          </View>

          <RadarChart score={chartScore} name={chartName} />

          <View>
            <Image
              source={require("../assets/images/railroadTracks.png")}
              style={styles.linebreak}
            />
          </View>

          <Text style={styles.achieve}>Achievements</Text>

          <View style={styles.awards}>
            <View style={styles.achieveIcon}>
              <Image
                source={require("../assets/images/hourglass.png")}
                style={styles.pic}
              />
            </View>
            <View style={styles.awards}>
              <Text style={styles.achievement}>Brain Lather</Text>
              <Text style={styles.description}>Two Total Hours Played</Text>
            </View>
          </View>

          <View style={styles.awards}>
            <View style={styles.perfectIcon}>
              <Image
                source={require("../assets/images/perfectScoreIcon.png")}
                style={styles.pic}
              />
            </View>
            <View style={styles.awards}>
              <Text style={styles.achievement}>Perfect Score</Text>
              <Text style={styles.description}>Zero Errors in One Round</Text>
            </View>
          </View>

          <View style={styles.awards}>
            <View style={styles.sixFigures}>
              <Image
                source={require("../assets/images/medal.png")}
                style={styles.pic}
              />
            </View>
            <View style={styles.awards}>
              <Text style={styles.achievement}>Six Figures</Text>
              <Text style={styles.description}>Reach 100,000 Total Points</Text>
            </View>
          </View>

          <View style={styles.awards}>
            <View style={styles.million}>
              <Image
                source={require("../assets/images/trophy.png")}
                style={styles.pic}
              />
            </View>
            <View style={styles.awards}>
              <Text style={styles.achievement}>Two Commas</Text>
              <Text style={styles.description}>
                Reach 1,000,000 Total Points
              </Text>
            </View>
          </View>

          <View style={styles.awards}>
            <View style={styles.gamer}>
              <Image
                source={require("../assets/images/joystick.png")}
                style={styles.pic}
              />
            </View>
            <View style={styles.awards}>
              <Text style={styles.achievement}>Gamer</Text>
              <Text style={styles.description}>
                Play Every Brain Train Game
              </Text>
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
  contentContainer: {
    paddingTop: 30,
    paddingBottom: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  profileTitle: {
    fontSize: 60,
    textAlign: "center",
    marginTop: height - height * 0.97,
    marginBottom: width * 0.05,
    textAlign: "center",
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  },
  description: {
    fontSize: 12,
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  },
  achieve: {
    fontSize: 45,
    marginTop: width * 0.1,
    marginBottom: width * 0.05,
    textAlign: "center",
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  },
  awards: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: width * 0.05
  },
  achievement: {
    fontSize: 30,
    fontFamily: "CarterOne",
    color: "white",
    paddingHorizontal: 5,
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  },
  pic: {
    width: width * 0.15,
    height: width * 0.15
  },
  achieveIcon: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: "#DFABF8",
    borderColor: "#9703DF",
    borderWidth: 7,
    borderRadius: 50,
    paddingTop: width * 0.028,
    paddingLeft: width * 0.033,
    marginLeft: width * 0.05
  },
  perfectIcon: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: "#8EE4FB",
    borderColor: "#036EDF",
    borderWidth: 7,
    borderRadius: 50,
    paddingTop: width * 0.037,
    paddingLeft: width * 0.03,
    marginLeft: width * 0.05
  },
  sixFigures: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: "#F7B1B0",
    borderColor: "#F70602",
    borderWidth: 7,
    borderRadius: 50,
    paddingTop: width * 0.037,
    paddingLeft: width * 0.033,
    marginLeft: width * 0.05
  },
  million: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: "#80CB6E",
    borderColor: "#1F9902",
    borderWidth: 7,
    borderRadius: 50,
    paddingTop: width * 0.037,
    paddingLeft: width * 0.035,
    marginLeft: width * 0.05
  },
  gamer: {
    width: width * 0.25,
    height: width * 0.25,
    backgroundColor: "#F5C06F",
    borderColor: "#F0960C",
    borderWidth: 7,
    borderRadius: 50,
    paddingTop: width * 0.025,
    paddingLeft: width * 0.035,
    marginLeft: width * 0.05
  },
  linebreak: {
    width: width - 100,
    height: height / 40
  },
  image: {
    width: width - width / 3,
    height: width - width / 3,
    marginTop: height - height * 0.97,
    borderWidth: 0,
    borderRadius: 200,
    resizeMode: "contain"
  },
  stats: {
    fontSize: 45,
    marginTop: width * 0.1,
    marginBottom: width * 0.05,
    textAlign: "center",
    fontFamily: "CarterOne",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 8,
    textShadowOffset: { width: -1, height: 1 }
  },
  settings: {
    width: width - width * 0.8,
    height: width - width * 0.8,
    marginTop: 15,
    marginBottom: width * 0.1
  },
  edit: {
    width: width - width * 0.9,
    height: width - width * 0.9,
    marginTop: width * 0.1,
    marginRight: width * 0.25
  },
  editProfileOne: {
    fontSize: 18,
    marginRight: width - width * 1.1
  },
  editProfileTwo: {
    fontSize: 18,
    marginRight: width * 0.1
  },
  goToStats: {
    fontSize: 18,
    marginTop: height - height * 1.02,
    marginLeft: width * 0.03
  },
  tableContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FCE1E0"
  },
  table: {
    width: 320,
    borderWidth: 3,
    backgroundColor: "#FCE1E0",
    marginBottom: width * 0.1
  },
  head: {
    height: 70,
    backgroundColor: "#FCCBC9"
  },
  text: {
    margin: 5,
    color: "#FF7F7B",
    paddingLeft: 25,
    margin: 5,
    fontWeight: "bold"
  },
  textHead: {
    color: "#0151FC",
    paddingLeft: 30,
    fontWeight: "bold"
  },
  icons: {
    flex: 2,
    flexDirection: "row"
  }
});
