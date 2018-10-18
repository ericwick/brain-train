import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/robot-dev.png"),
        require("./assets/images/robot-prod.png")
      ])
      // Font.loadAsync({
      //   // This is the font that we are using for our tab bar
      //   ...Icon.Ionicons.font,
      //   // We include SpaceMono because we use it in SplashScreen.js. Feel free
      //   // to remove this if you are not using it in your app
      //   "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
      // })
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red"
  }
});

// IMPORT A LIBRARY to help create a component

// import React from 'react';

// import all of the elements you use in the component
// import { Text, AppRegistry } from 'react-native';

// CREATE A COMPONENT

// const App = () => {
//   return (
//     <Text>Some Text</Text>
//   )
// };
// Components are just about the same in Native as the are in React

// RENDER IT to the device

// AppRegistry.registerComponent('albums', () => App);
// what is the 'albums' referencing?

// NAVIGATION
// react-native-router-flex

// npm install --save react-native-router-flux@3.35.0

// a scene is a component that we import from teh routing library

// this is just like route.js and making your <Switch><Route/></Switch>
{
  /* <Scene key="login" component={LoginForm} /> */
}

// initial - this is the first screen to show
// title="Login" - make a nav bar and give it a title of "Login"
