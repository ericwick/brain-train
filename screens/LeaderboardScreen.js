import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  View
} from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import { ExpoLinksView } from "@expo/samples";
import LeaderboardTable from "../components/LeaderboardTable/LeaderboardTable";
import AppNavigator from "../navigation/AppNavigator";
import Nav from "../components/NavBar/Nav";

export default class LeaderboardScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: [],
      score: []
    };
    this.getLeaders = this.getLeaders.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
        console.warn(this.state.users, "RESPONSE.DATA");
      })
      .catch(err => {
        console.warn(err);
      });
  }

  getLeaders() {
    axios.get(`http://localhost:3001/api/stats/leader/${1}`).then(res => {
      let users = res.data.map(e => e.username);
      let gamescore = res.data.map(e => [e.score]);
      console.log(users, gamescore);
      this.setState({
        username: users,
        score: gamescore
      });
    });
  }

  render() {
    let { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}> LEADERBOARD </Text>

          <Text style={styles.leaderboardTitle}>Global Leaderboard</Text>
          <LeaderboardTable stats={this.state} />
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
    alignItems: "center",
    paddingTop: 70,
    paddingBottom: 120
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#474C5D",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 100
  },
  title: {
    fontSize: 35,
    marginTop: 50,
    color: "white"
  },
  leaderboardTitle: {
    fontSize: 20,
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 20,
    color: "white"
  }
});
