import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, TouchableHighlight, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from '../components/Themed';
import axios from 'axios';
import { CircularProgress } from '@material-ui/core';

export default function PropertyDetailScreen({ route }) {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { idProperty } = route.params;

  useEffect(() => {
    // axios.get(`http://localhost:8000/api/v1/property/${id}`).then(response => {
    axios.get(`http://www.share-your-universe.com/public/api/v1/property/${idProperty}`).then(response => {
        console.log(response.data);
        setData(response.data);
        setLoading(false);
    });
  }, [idProperty]);

  if (isLoading) {
    return <div className="App"><CircularProgress disableShrink /></div>;
  }

  return(
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>idProperty: {data.property.idProperty}</Text>
      <Text>idUser: {data.property.idUser}</Text>
      <Text>propertyStatus: {data.property.propertyStatus}</Text>
      {
        data.parameters.map(param =>
          <Text>{param.keyParameter + ' : ' + param.valueParameter}</Text>  
        )
      }
    </SafeAreaView>
  )

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