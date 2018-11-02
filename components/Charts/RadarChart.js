import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import Echarts from "native-echarts";

export default class app extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    const option = {
      title: {
        text: "Brain Train Progress"
      },
      tooltip: {},
      legend: {
        data: ["Games"]
      },
      xAxis: {
        data: this.props.name
      },
      yAxis: {},
      series: [
        {
          type: "bar",
          data: this.props.score
        }
      ]
    };
    return <Echarts option={option} height={300} />;
  }
}
