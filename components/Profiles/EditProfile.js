import React, { Component } from "react";
import {
  Image,
  Platform,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  ImageBackground
} from "react-native";
import PopupDialog, {
  DialogTitle,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
  FadeAnimation
} from "react-native-popup-dialog";
import axios from "axios";

const slideAnimation = new SlideAnimation({ slideFrom: "bottom" });
const scaleAnimation = new ScaleAnimation();
const fadeAnimation = new FadeAnimation({ animationDuration: 150 });

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      username: "",
      password: "",
      profilePic: ""
      //  don't need state here, but just to stay organized
    };
  }

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
  }

  render() {
    console.log("Current User: ", this.state.user);
    console.log("Username: ", this.state.user.username);
    console.log("Password: ", this.state.user.password);
    console.log("Profile Pic: ", this.state.user.profilePic);

    return (
      <ImageBackground
        source={require("../../assets/images/mobileGUI/sky_bg.png")}
      >
        <ScrollView>
          <View contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>
          </View>

          <Text>{this.state.username}</Text>

          <TextInput
            onChangeText={text => this.setState({ username: text })}
            style={styles.username}
            value={!this.state.username ? null : this.state.username}
            placeholder="USERNAME"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="#077FDD"
            placeholderTextFontWeight="bold"
          />

          <Text>{this.state.password}</Text>

          <TextInput
            onChangeText={text => this.setState({ password: text })}
            style={styles.password}
            value={!this.state.user.password ? null : this.state.user.password}
            placeholder="PASSWORD"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="#077FDD"
            placeholderTextFontWeight="bold"
          />

          <Image
            source={
              !this.state.profilePic
                ? this.state.user.profilePic
                : this.state.profilePic
            }
          />

          <TextInput
            onChangeText={text => this.setState({ profilePic: text })}
            style={styles.pic}
            value={
              !this.state.user.profilePic ? null : this.state.user.profilePic
            }
            placeholder="PROFILE PICTURE"
            autoCapitalize="none"
            underlineColorAndroid="transparent"
            placeholderTextColor="#077FDD"
            placeholderTextFontWeight="bold"
          />

          {/* THE PROFILE PIC EDIT MIGHT BE A LITTLE BIT COMPLICATED BECAUSE WE HAVE IT SET UP TO RECEIVE URLs BUT ON A MOBILE DEVICE, NO ONE DOES THAT, THEY USE IMAGES STORED ON THEIR DEVICE SO MAY NEED FIREBASE OR REACT NATIVE EQUIVALENT TO UPLOAD PICS. SIMILAR TO HOW GARRETT DID IT ON APPY */}
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontFamily: "CarterOne",
    fontSize: 35
  }
});
