import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import ProgressTimer from "../Games/ProgressTimer";

//Different Charts to bring in
// import Victory from '../Charts/VictoryChart';
// import AbstractChart from '../Charts/Charts/Pie';
// import RadarChart from "../Charts/RadarChart";
// import Progress from '../Charts/ProgressChart';
// import Bar from '../Charts/BarChart';
// import GAME_BG from '../assets/game_bg.png';
// import Pure from '../Charts/PureChart';;
// import Pie from '../Charts/Charts/Pie;'
// import  CircularProgress from '../Charts/CircularProgress'; 
import  Radia from '../Charts/Radar/Radia'; 

export default class UserStats extends Component {
  render() {
    return (
      <View>
        {/* <Pure/> */}
        {/* <Progress/>  */}

        {/* <RadarChart/> */}
        {/* <CircularProgress/> */}
        <Radia/>
      </View>
    );
  }
}
