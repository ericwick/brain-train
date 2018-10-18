import React, { Component } from 'react'
import { Platform, Text, View, StyleSheet } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import LeaderboardTable from '../components/LeaderboardTable/LeaderboardTable'; 
import axios from 'axios';


export default class Leaderboards extends Component {
  constructor(){ 
    super(); 
    this.state ={ 
      username: [],
      score: []

    };
  }
  
componentDidMount(){ 
  axios.get(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/stats/leader/${1}`)
  .then(res => {
    let users = res.data.map(e => e.username)
    let gamescore = res.data.map(e => [e.score])
    this.setState({ 
      username: users,
      score: gamescore
    });
  })
  .catch(err => console.log('err', err))
}

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
      <Text style={styles.leaderboardTitle}> Global Leaderboards: </Text>
      <LeaderboardTable  stats={state}/>
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
