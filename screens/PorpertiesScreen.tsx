import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '../components/Themed';
import axios from 'axios';
//import Property from '../models/Property';
import { useNavigation } from '@react-navigation/native';

export default function PropertiesScreen() {

  const [properties, setProperties] = useState([])
  const navigation = useNavigation();

  useEffect(() => {
		// axios.get("http://localhost:8000/api/v1/properties").then( response => {
		axios.get("http://www.share-your-universe.com/public/api/v1/properties").then(response => {
			console.log(response.data.property);
			setProperties(response.data.property);
		});
	}, []); 

  const Item = ({ item }) => (
    <TouchableOpacity 
      style={[styles.item]} 
      onPress={() => navigation.navigate('Property', { idProperty: item.idProperty }
    )}>
      <Text style={[styles.title]}>{item.idProperty as Number}</Text>
      <Text style={[styles.title]}>{item.propertyStatus as Number}</Text>
    </TouchableOpacity>
  );
  
  const renderItem = ({ item }) => {
    return(
      <Item
        item={item}
      />
    );
  };

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
