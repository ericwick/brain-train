import { SocialIcon } from "react-native-elements";

// Icon
import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class SocialMedia extends Component {
  render() {
    return (
      <View contentContainerStyle={styles.container}>
        <SocialIcon
          style={styles.socialButton}
          title="Share scores on Facebook"
          button
          type="facebook"
        />
        <SocialIcon
          style={styles.socialButton}
          title="Tweet scores on Twitter"
          button
          raised
          underlayColor="grey"
          type="twitter"
        />
        <SocialIcon button type="medium" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55
  },
  socialButton: {
    height: 50,
    width: 240,
    marginVertical: 20
  }
});
