import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";
import AppNavigator from "../navigation/AppNavigator";
import { AsyncStorage } from "react-native";
import axios from "axios";
import Nav from "../components/NavBar/Nav";

import { MonoText } from "../components/StyledText";
import { Button, Tile } from "react-native-elements";
import PopupModal from "../components/popupModal/popupModal";

const { height, width } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      users: []
    };
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
        console.log(this.state.user);
      })
      .catch(err => {
        console.warn("Error loading current user");
      });
    let point = `http://${
      __DEV__
        ? Platform.OS === "ios"
          ? "localhost"
          : "172.31.99.105"
        : production.url
    }:3001/api/users`;
    axios
      .get(point)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.warn(err));
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/images/mobileGUI/sky_bg.png")}
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.image}
            />
          </View>
          <View>
            <Text style={styles.title}>ABOUT</Text>
          </View>

          <View>
            <Text>
              Spicy jalapeno bacon ipsum dolor amet sunt meatball boudin do
              deserunt. Qui in tail pancetta, turkey porchetta short loin
              picanha. Velit jerky occaecat turkey landjaeger kevin dolor
              consectetur ham hock cow sint dolore fatback. Pancetta buffalo
              occaecat boudin ut burgdoggen sunt cow non dolore in lorem esse
              nulla.</Text>
              
              <View>
                <Image source={require("../assets/images/robot-dev.png")} style={styles.}/>
              </View>
              
              Sed shoulder rump brisket meatball eiusmod culpa. Non
              pancetta pariatur, frankfurter culpa ea excepteur buffalo
              hamburger ham hock dolore aute aliquip nulla. Non corned beef
              alcatra, ullamco biltong chuck porchetta burgdoggen ground round
              deserunt boudin. Ut tempor anim, hamburger pancetta cow quis
              dolore adipisicing ipsum. Shoulder tri-tip mollit ut enim nostrud.
              Nisi jowl pastrami pig, voluptate culpa dolore. Swine t-bone pork
              chicken tongue pork chop landjaeger. Quis jowl aliqua ribeye
              chicken ut, officia kielbasa proident excepteur ham hock et. Bacon
              in jowl id tenderloin, adipisicing minim cupim aute quis pariatur.
              Doner pork loin et flank. Bresaola sint cow, officia pastrami
              biltong reprehenderit incididunt. Capicola excepteur laborum filet
              mignon nisi corned beef meatball do. Reprehenderit salami corned
              beef, ad hamburger pig bacon enim cupidatat dolore mollit sausage
              culpa. Ad salami t-bone kevin. Turkey frankfurter in pork chop
              tongue, buffalo qui tail ham dolore tri-tip porchetta brisket
              cupidatat kielbasa.
            </Text>
          </View>

          <TouchableOpacity>
            <Button
              onPress={() => this.props.navigation.navigate("Splash")}
              title="BACK"
              buttonStyle={{
                backgroundColor: "#F9D49B",
                width: width - 280,
                height: height - height / 0.8,
                marginTop: 10,
                borderColor: "#FD9B03",
                borderWidth: 3,
                borderRadius: 5
              }}
              textStyle={{
                color: "#FD9B03",
                fontSize: 18,
                letterSpacing: 1,
                fontWeight: "bold"
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  image: {
    resizeMode: "contain",
    width: 370,
    height: 200,
    transform: [{ rotate: "-2deg" }],
    marginRight: 12,
    marginTop: (width / width) * 50
  },
  container: {
    flex: 1,
    alignItems: "center"
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 110
  },
  title: {
    fontSize: 72,
    fontWeight: "bold"
  }
});
