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
import SocialMedia from "../components/SocialMedia/SocialMedia";
import AppNavigator from "../navigation/AppNavigator";
import Nav from "../components/NavBar/Nav";

export default class LeaderboardScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  static navigationOptions = {
    header: null
  };

  // EW - get all Users
  componentDidMount() {
    axios
      .get("http://localhost:3001/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
        console.warn(this.state.users, "RESPONSE.DATA");
        // EW - got the data coming through but unable to set state
      })
      .catch(err => {
        console.warn(err);
      });
  }

  render() {
    let { navigation } = this.props;
    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          {/* EW - FIGURE OUT WHY SOME COMPONENTS HAVE THE WHITE HEADER PART */}
          <Text> TOTALS: </Text>

          <TouchableOpacity style={styles.leaderboardsButton}>
            <Button
              icon={<Icon name="arrow-right" size={15} color="blue" />}
              title="Leadboards"
              onPress={() => navigation.navigate("Leadboards")}
            />
          </TouchableOpacity>

          <Text>{this.state.users.username}</Text>

          <SocialMedia />
        </ScrollView>

        <Nav navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3783F5",
    justifyContent: "center",
    alignItems: "center"
  },
  leaderboardsButton: {
    backgroundColor: "green",
    maxHeight: 40,
    borderRadius: 30,
    width: 150
  }
});
