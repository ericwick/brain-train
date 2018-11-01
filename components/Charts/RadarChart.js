import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Echarts from 'native-echarts';

export default class app extends Component {
  render() {
    const option = {
      title: {
          text: 'Brain Train Progress'
      },
      tooltip: {},
      legend: {
          data:['Games']
      },
      xAxis: {
          data: ['Tap Tile', 'Memory Tiles', 'Trivia', 'Tap Number']
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10]
      }]
    };
    return (
      <Echarts option={option} height={300} />
    );
  }
}
