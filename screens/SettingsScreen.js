import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  Image, 
  TouchableOpacity
} from "react-native";
// import { ExpoConfigView } from "@expo/samples";
import { Avatar } from "react-native-elements";

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.userContainer}>
          <Avatar
            large
            rounded
            source={{
              uri:
                "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
            }}
            onPress={()=>{console.log('This button works')}}
            activeOpacity={0.7}
          />
          <Text style={styles.username}> Username </Text>
          <Text style={styles.editProfile}>Edit Profile</Text>
          <TouchableOpacity style={styles.editButton}
          onPress={() => this.props.navigation.navigate("editProfile")}
            >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri:
                  "https://d30y9cdsu7xlg0.cloudfront.net/png/6052-200.png"
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    // justifyContent: "Space-around"
  },
  username: {
    fontSize: 20,
    marginTop: 20
  },
  userContainer: {
    flex: 1,
    flexDirection: "row"
  },
  editProfile:{ 
    marginLeft: 85,
    marginTop: 23
  },
  editButton:{ 
    marginTop: 11,
    marginLeft: 10
  }
});
