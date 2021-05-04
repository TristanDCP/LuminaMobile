import * as React from 'react';
import {Image, StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  return (
    <Text>Salut salut</Text>
  // <View style={{flex: 1}}>
  // <View><Text>my text</Text></View>
  //     <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
  //     <Image
  //       source={require('../assets/images/luminalogo.png')}
  //       style={{ width: 200, height: 200  }}
  //       />
  //     </View>
  // </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'gray',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

