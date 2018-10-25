import React, { Component } from 'react'
import { Text, View , StyleSheet} from 'react-native'
import ProgressTimer from '../Games/ProgressTimer';


            //Different Charts to bring in 
// import Victory from '../Charts/Charts/VictoryChart';
// import AbstractChart from '../Charts/Charts/Pie';
// import RadarChart from '../Charts/Charts/RadarChart';
// import Progress from '../Charts/Charts/ProgressChart';
// import Bar from '../Charts/Charts/BarChart';
// import GAME_BG from '../assets/game_bg.png';
import Pure from '../Charts/PureChart';; 
// import Pie from '../Charts/Charts/Pie;'

export default class UserStats extends Component {
  render() {
    return (
      <View>
        <Pure/>
        <ProgressTimer/> 
      </View>
    )
  }
}