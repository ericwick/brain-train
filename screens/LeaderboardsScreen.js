import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import LeaderboardTable from '../components/LeaderboardTable/LeaderboardTable'; 
import axios from 'axios';
import Audio from '../components/Charts/media/audio';


export default class Leaderboards extends Component {
  constructor(){ 
    super(); 
    this.state ={ 
      username: [],
      score: []

    };
  }
  
componentDidMount(){ 
  axios.get(`http://localhost:3001/api/stats/leader/${1}`).then(res => {
    let users = res.data.map(e => e.username)
    let gamescore = res.data.map(e => [e.score])
    console.log(users, gamescore);
    this.setState({ 
      username: users,
      score: gamescore
    });
  })
}

  render() {
    // const soundObject = new Expo.Audio.Sound();
    // try {
    //   await soundObject.loadAsync(require('../assets/sounds/quiz_game.wav'));
    //   await soundObject.playAsync();
    //   // Your sound is playing!
    // } catch (error) {
    //   // An error occurred!
    // }
    const state = this.state;
    return (
      <View style={styles.container}>
      <Text style={styles.leaderboardTitle}> Global Leaderboards: </Text>
      {/* <View>{soundObject}</View> */}
      {/* <LeaderboardTable  stats={state}/> */}
      {/* <Audio/> */}
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }, 
  leaderboardTitle: {
    fontSize: 20, 
    justifyContent: "center", 
    alignContent: "center"
  }
});
