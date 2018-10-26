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

import { MonoText } from "../components/StyledText";


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
        this.setState({
          user: JSON.parse(value)
        });
      })
      .catch(err => {
        console.warn("Error loading current user");
      });
    axios
      .get(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/users`)
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
      if (this.state.users[i].username === this.state.user[0].username) {
        currentUser = this.state.users[i];
        console.warn(this.state.user[0].username, "USER USERNAME");
      }
    }

    return (
      <ImageBackground
        source={require("../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.profileTitle}>{currentUser.username}</Text>

          <Image
            source={{ uri: currentUser.profile_pic }}
            style={styles.image}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("EditProfile")}
          >
          {/* <Text> Edit Profile </Text> */}
            <Image
              style={styles.settings}
              source={require("../assets/images/edit.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserStats")}
          >
          {/* <Text> Edit Profile </Text> */}
            <Image
              style={styles.settings}
              source={{
                uri: "https://cdn3.iconfinder.com/data/icons/e-commerce-8/91/stats-512.png"
              }}
            />
          </TouchableOpacity>
          
          

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Achievements")}
          >
            <Text style={styles.achieve}>Achievements</Text>
          </TouchableOpacity>

          <View style={styles.linebreak} />

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
              <Rows data={this.state.tableData} textStyle={styles.text} />
            </Table>
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
    fontSize: 45,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "#5D02AD",
    textShadowColor: "white",
    textShadowOffset: { width: 1.5, height: 2 },
    textShadowRadius: 2.8,
    fontWeight: "bold"
  },
  achieve: {
    fontSize: 30,
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
    color: "#FF7F7B",
    textShadowColor: "#AAAD02",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5
  },
  linebreak: {
    width: 280,
    borderBottomColor: "red",
    borderBottomWidth: 2,
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 50
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 20,
    borderWidth: 0,
    borderRadius: 80
  },
  stats: {
    fontSize: 30,
    marginBottom: 20,
    color: "#02B412",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1.4 },
    textShadowRadius: 1
  },
  settingsContainer:{

  },
  settings: {
    width: 40,
    height: 40,
    marginTop: 15
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
    backgroundColor: "#FCE1E0"
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
  }
});
