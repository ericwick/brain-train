import React, { Component } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col
} from "react-native-table-component";

export default class LeaderboardTable extends React.Component {
  constructor() {
    super();
    this.state = {
      tableHead: ["Username", "Score"],
      tableData: [
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301],
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301],
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301],
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301],
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301],
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301],
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301],
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301],
        ["player0", 5234],
        ["player1", 4504],
        ["player2", 4241],
        ["player3", 3973],
        ["player4", 2301]
      ]
    };
  }

  render() {
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
            <Rows data={this.state.tableData} textStyle={styles.text} />
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
