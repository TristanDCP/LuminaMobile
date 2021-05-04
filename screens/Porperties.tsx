import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '../components/Themed';
import axios from 'axios';
//import Property from '../models/Property';

export default function PropertiesScreen() {

  const [properties, setProperties] = useState([])
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
		// axios.get("http://localhost:8000/api/v1/properties").then( response => {
		axios.get("http://www.share-your-universe.com/public/api/v1/properties").then(response => {
			console.log(response.data.property);
			setProperties(response.data.property);
		});
	}, []);

  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.idProperty as Number}</Text>
      <Text style={[styles.title, textColor]}>{item.propertyStatus as Number}</Text>
    </TouchableOpacity>
  );
  
  const renderItem = ({ item }) => {
    const backgroundColor = item.idProperty === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.idProperty === selectedId ? 'white' : 'black';

    return(
      <Item
        item={item}
        onPress={() => setSelectedId(item.idProperty)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={properties}
          renderItem={renderItem}
          keyExtractor={item => item.idProperty.toString()}
          extraData={selectedId}
        />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});