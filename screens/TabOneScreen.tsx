import * as React from 'react';
import { StyleSheet, TouchableHighlight, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '../components/Themed';
import axios from 'axios';

import Property from '../models/Property';

import { 
  Card,
 } from "@material-ui/core";

export default function TabOneScreen() {

  const [properties, setProperties] = React.useState([])

  React.useEffect(() => {
		// axios.get("http://localhost:8000/api/v1/properties").then( response => {
		axios.get("http://www.share-your-universe.com/public/api/v1/properties").then(response => {
			console.log(response.data.property);
			setProperties(response.data.property);
		});
	}, []);

  //callApi()
  
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>ID : {item.idProperty as Number}</Text>
      <Text style={styles.title}>Status : {item.propertyStatus as Number}</Text>
    </View>   
  );

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={properties}
          renderItem={renderItem}
          keyExtractor={item => item.idProperty.toString()}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AAA',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  title: {
    fontSize: 35
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  }
});