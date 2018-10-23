import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, Button , ImageBackground} from "react-native";
import {  Icon } from "react-native-elements";

import { ExpoLinksView } from "@expo/samples";
import SocialMedia from "../components/SocialMedia/SocialMedia";
import AppNavigator from '../navigation/AppNavigator';


            //Different Charts to bring in 
// import Victory from '../components/Charts/VictoryChart';
// import AbstractChart from '../components/Charts/Pie';
// import RadarChart from '../components/Charts/RadarChart';
// import Progress from '../components/Charts/ProgressChart';
// import Bar from '../components/Charts/BarChart';
import GAME_BG from '../assets/game_bg.png';
import Pure from '../components/Charts/PureChart'; 
// import Pie from '../components/Charts/Pie;'
import RadarChar from '../components/Charts/Radar/Radar'; 





export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: "Stats"
  };

  render() {
    
  
    return (
      <ScrollView style={styles.container}>
        {/* <Text> TOTALS: </Text> */}
        <TouchableOpacity style={styles.leaderboardsButton}>
          <Button
            icon={<Icon name="arrow-right" size={15} color="blue" />}
            title="Leadboards"
            onPress= {() => this.props.navigation.navigate("Leadboards")}
            />
        </TouchableOpacity>
        {/* <RadarChar />  */}
          {/* <Pie/> */}
          <Pure/>
        {/* <Victory/> */}
        {/* <PieChart/> */}
        {/* <Bar/> */}
        {/* <Progress/>  */}
        {/* <SocialMedia /> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff",
    // backgroundImage: {GAME_BG}
  },
  leaderboardsButton: {
    backgroundColor: 'black',
    maxHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30, 
    width: 150
  },
  ImageBackground: {

  }
 

});
