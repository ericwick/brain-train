import React, {Component} from 'react'
import {Text as ReactText, View}  from 'react-native'
import Svg,{ G, Path, Line, Text} from 'react-native-svg'
import { Options, identity, styleSvg, fontAdapt } from './util'
const Radar = require('paths-js/radar')

function accessKeys(keys) {
  let a = {}
  for (let i in keys) {
    let key = keys[i]
    a[key] = identity(key)
  }
  return a
}

export default class RadarChar extends Component
{

//   static defaultProps = {
//     options: {
//       width: 600,
//       height: 600,
//       margin: {top: 20, left: 20, right: 20, bottom: 20},
//       r: 300,
//       max: 150,
//       rings: 3,
//       fill: '#2980B9',
//       stroke: '#2980B9',
//       animate: {
//         type: 'oneByOne',
//         duration: 200,
//         fillTransition:3
//       },
//       label: {
//         fontFamily: 'Arial',
//         fontSize: 14,
//         bold: true,
//         color: '#34495E'
//       }
//     }
//   }

  
    render() {
        let data2 = {
          "speed": 74,
          "balance": 29,
          "explosives": 40,
          "energy": 40,
          "flexibility": 30,
          "agility": 25,
          "endurance": 44
        }
      
        let options2 = { 
          width: 290,
          height: 290,
          margin: {
            top: 20,
            left: 20,
            right: 30,
            bottom: 20
          },
          r: 150,
          max: 100,
          fill: "#2980B9",
          stroke: "#2980B9",
          animate: {
            type: 'oneByOne',
            duration: 200
          },
          label: {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: true,
            fill: '#34495E'
          }
        }
      
        return (
          <View>
            <Radar data={data2} options={options2} />
          </View>
        )
      }
  
}