import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon, RadioButton  } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PropertyAfterFilter(props){

  const [properties, allPropertyDatas] = useState([])
  const navigation = useNavigation();


  useEffect(() => {
    getAllProperties();
  }, []);

  const getAllProperties = () =>{
    axios.get("http://www.share-your-universe.com/public/api/v1/properties")
      .then((response) => {
        // console.log(response.data.property)
        const propertyDatas = response.data.property;
        allPropertyDatas(propertyDatas);
    })
    .catch (error => console.log('Error'));
  }

  let data = properties;
  // console.log(props.route.params.Valeur, props.route.params.Type, props.route.params.Orientation, props.route.params.Piece, properties);

  data = data.filter(function(item){
    return item.state == Valeur;
  }).map(function({keyParameter, valueParameter}){
    return {keyParameter, valueParameter};
  });

  console.log(data);



  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        {/* {console.log(props.route.params.Valeur, props.route.params.Type, props.route.params.Orientation, props.route.params.Piece)} */}
      </View>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },

  radiostyle: {
    marginTop: 10,
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    textAlign: 'center',
  }
});