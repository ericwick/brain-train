import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, Button } from "react-native";
import {  Icon } from "react-native-elements";

import { ExpoLinksView } from "@expo/samples";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import AppNavigator from '../navigation/AppNavigator';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Stats"
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text> TOTALS: </Text>
        <TouchableOpacity style={styles.leaderboardsButton}>
          <Button
            icon={<Icon name="arrow-right" size={15} color="blue" />}
            title="Leadboards"
            onPress= {() => this.props.navigation.navigate("Leadboards")}
            />
        </TouchableOpacity>
        <SocialMedia />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  },
  leaderboardsButton: {
    backgroundColor: 'green',
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30, 
    width: 150
  }

});
