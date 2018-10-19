import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
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
      .get("http://localhost:3001/api/users")
      .then(response => {
        this.setState({
          users: response.data
        });
      })
      .catch(err => console.warn(err));
    axios
      .get("http://localhost:3001/api/stats")
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
            borderStyle={{ borderWidth: 2, borderColor: "white" }}
          >
            <Row
              data={this.state.tableHead}
              style={styles.head}
              textStyle={{ color: "#474C5D", paddingLeft: 40 }}
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
    backgroundColor: "transparent"
  },
  head: {
    height: 70,
    backgroundColor: "white"
  },
  text: {
    margin: 5,
    color: "white",
    paddingLeft: 35
  }
});
