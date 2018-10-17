import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';


export default class Leaderboards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Username', 'Score'],
      tableTitle: ['1', '2', '3', '4'],
      tableData: [
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c']
      ]
    }
  }
 
  render() {
    
    const state = this.state;
    return (
      <View style={styles.container}>
      <Table>
        <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text}/>
        <TableWrapper style={styles.wrapper}>
          <Col data={this.props.stats.username} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
          <Rows data={this.props.stats.score} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text}/>
        </TableWrapper>
      </Table>
    </View>
    )
  }
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa', width: 5 },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});
