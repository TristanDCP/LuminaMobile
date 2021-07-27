import * as React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Card, ListItem, Button, Icon  } from 'react-native-elements';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function PropertyDetails(props) {
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
return(
<ScrollView>
<View>
        {console.log(props.route.params['logementType'])} 
      <Card key={props.idPropriety}>
      <Card.Title>Type de propriété : {props.route.params['logementType']}</Card.Title>
      <Card.Divider/>
        <Card.Image source={{ uri: props.route.params['image']}}></Card.Image>
      <Card.Divider/>
       
        <Text>- {props.route.params['logementType']} </Text> 
        <Text>- {props.route.params['surface']} </Text>
        <Text>- {props.route.params['nombrepiece']} pièces</Text> 
        <Text>- {props.route.params['orientation']} </Text>
        <Text>- {props.route.params['prix']} </Text>
        <Text>- {props.route.params['specificite']} </Text>
        <Text>- {props.route.params['ville']} </Text>
        <Text style={{marginBottom: 10}}>- {props.route.params['codePostal']} </Text>
 
          
        <Button onPress={() => navigation.navigate('HomePage')}
          title="Retour à la page précédente" />
      </Card>

</View>
</ScrollView>
)
}  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: "#eaeaea"
    },
  });