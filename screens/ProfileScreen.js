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

import { MonoText } from "../components/StyledText";

export default class ProfileScreen extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      data: [],
      tableHead: ["Game", "Score"],
      tableData: [
        ["game0", 234],
        ["game1", 604],
        ["game2", 641],
        ["game3", 473],
        ["game4", 301]
      ]
    };
    this.buttonCheck = this.buttonCheck.bind(this);
  }
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/user/current")
      .then(response => {
        console.warn(response.data, "CURRENT USER RESPONSE");
        this.setState({
          user: response.data
        });
      })
      .catch(err => console.log(err, "CURRENT USER ERR"));
  }

  buttonCheck() {
    console.warn("All good.");
  }

  // componentDidMount() {
  //   axios.get(`http://localhost:3001/api/stats/${id}`).then(response => {
  //     console.warn(response.data);
  //     this.setState({
  //       data: response.data
  //     });
  //   });
  // }

  render() {
    console.warn(this.state.user, "USER ARRAY");
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.profileTitle}>
            {/* {this.state.users.username} */}
            USERNAME
          </Text>

          {/* <Image source={this.state.users.profile_pic} style={styles.image} /> */}

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("EditProfile")}
          >
            <Image
              style={styles.settings}
              source={require("../assets/images/edit.png")}
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
                borderColor: "#FF7F7B",
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#474C5D"
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
    color: "#FF7F7B",
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
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1.4 },
    textShadowRadius: 1
  },
  linebreak: {
    width: 280,
    borderBottomColor: "white",
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
    color: "#FF7F7B",
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1.4 },
    textShadowRadius: 1
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
    // padding: 15
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
    color: "#FF7F7B",
    paddingLeft: 30,
    fontWeight: "bold"
  }
});
