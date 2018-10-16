import { SocialIcon } from "react-native-elements";

// Icon
import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";

export default class SocialMedia extends Component {
  render() {
    return (
      <View>
        {/* <SocialIcon raised={false} type="gitlab" /> */}
        {/* <SocialIcon light type="medium" /> */}
        {/* <SocialIcon light raised={false} type="medium" /> */}
        <SocialIcon style={styles.socialButton} title="Sign In With Facebook" button type="facebook" />
        <SocialIcon style={styles.socialButton} title="Some Twitter Message" button="true" raised underlayColor type="twitter" />
        <SocialIcon button type="medium" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  socialButton:{ 
    height:40,
    width: 60
  }
});