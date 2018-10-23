import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import PureChart from "react-native-pure-chart";

export default class Pure extends Component {
  render() {
    let sampleData = [
      {
        seriesName: "series1",
        data: [
          { x: "F", y: 0 },
          { x: "Problem Solving", y: 10 },

          { x: "Memory", y: 200 },

          { x: "speed", y: 200 }
        ],
        color: "#297AB1"
      }
      //   {
      //     seriesName: "series2",
      //     data: [
      //       { x: "x", y: 20 },
      //       { x: "y", y: 100 },
      //       { x: "z", y: 140 },
      //       { x: "Memory", y: 550 },
      //       { x: "a", y: 40 }
      //     ],
      //     color: "yellow"
      //   }
    ];

    return (
      <ScrollView>
        <PureChart data={sampleData} type="bar" />
      </ScrollView>
    );
  }
}
