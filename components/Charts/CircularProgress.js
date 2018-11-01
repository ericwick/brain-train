import { ArtyChartyRadar } from 'arty-charty';
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class CircularProgress extends Component {
  render() {
    return (
      <View>
        <ArtyChartyRadar 
  gridColor="orange"
  gridLineWidth={1}
  gridStrokeDash={[0,0,4,6]}
  gridTextColor="white"
  gridTextSize={18}
  labelsTextSize={28}
  labelsTextColor="white"
  fill="rgba(0,255,0,.1)"
  labels={['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physical']}
  data={[
    {
      lineColor: 'black',
      markerColor: 'yellow',
      fill: 'rgba(85,37,130,.25)',
      data: Array.from(Array(6)).map(Math.random)
    },
    {
      lineColor: 'aqua',
      lineWidth: 5,
      strokeDash: [0,10],
      lineCap: 'round',
      markerColor: 'blue',
      fill: 'rgba(255,0,0,.25)',
      data: Array.from(Array(6)).map(Math.random)
    }
    ]}/>
      </View>
    )
  }
}
