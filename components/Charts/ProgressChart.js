import React, { Component } from "react";
import { Text, View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from "react-native-chart-kit";

export default class Progress extends Component {
  render() {
    const chartConfig = {
        // backgroundColor: '#e26a00',
            backgroundGradientFrom: '#ffffffff',
            backgroundGradientTo: '#ffffffff',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 2.0) => `rgb(204, 102, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
    };
    const data = [.9 , 0.6, 0.8, 0.3];
    return (
      <View>
        <Text>Progress Chart</Text>
        <ProgressChart
          data={data}
          width={375}
          height={220}
          chartConfig={chartConfig}
        />
      </View>
    );
  }
}
