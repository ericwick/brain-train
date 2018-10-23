import React, { Component } from "react";
import { Text, View } from "react-native";
import {BarChart} from "react-native-chart-kit";
export default class Bar extends Component {
  render() {
    const chartConfig = {
      // backgroundColor: '#e26a00',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`,
      style: {
        borderRadius: 16
      }
    };
    const data = {
      labels: ['Problem Solving', 'Memory', 'Speed', 'Language', 'Math'],
      datasets: [{
        data: [ 20, 45, 28, 80, 99 ]
      }]
    }
    return (
      <View>
        <Text> Totals by Category: </Text>
        <BarChart
          // style={graphStyle}
          data={data}
          width={375}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
}
