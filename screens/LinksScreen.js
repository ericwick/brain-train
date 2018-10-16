import React from 'react';
import { ScrollView, StyleSheet, Text} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import SocialMedia from '../components/SocialMedia/SocialMedia';




export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Stats',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
      <Text> TOTALS:  </Text>

        <SocialMedia/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
