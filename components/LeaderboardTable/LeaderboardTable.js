import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView, Platform} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";
import axios from "axios";

export default class LeaderboardTable extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      stats: [],
      tableHead: ["Username", "Score"]
    };
  }

  componentDidMount() {
    axios
      .get(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/users`)
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.warn(err));
    axios
      .get(`http://${__DEV__ ? (Platform.OS === 'ios' ? 'localhost' : '172.31.99.105') : production.url}:3001/api/stats`)
      .then(response => {
        this.setState({
          stats: response.data
        });
      })
      .catch(err => console.warn(err));
  }

  render() {
    let rank = [];

    this.state.stats.map((e, i, arr) => {
      rank.push([e.username, e.score]);
    });

    return (
      <View contentContainerStyle={styles.container}>
        <ScrollView style={styles.content}>
          <Table
            style={styles.table}
            borderStyle={{ borderWidth: 2, borderColor: "#FF7F7B" }}
          >
            <Row
              data={this.state.tableHead}
              style={styles.head}
              textStyle={{
                color: "#FF7F7B",
                paddingLeft: 45,
                fontWeight: "bold"
              }}
            />
            <Rows data={rank} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  },
  content: {
    flex: 1
  },
  table: {
    width: 320,
    backgroundColor: "#FCE1E0"
  },
  head: {
    height: 70,
    backgroundColor: "#FCCBC9"
  },
  text: {
    margin: 5,
    color: "#FF7F7B",
    paddingLeft: 35,
    fontWeight: "bold"
  }
});
