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
      <Card.Title>{ props.route.params['logementType'] == 'Appartement' ? 'Superbe ' : 'Magnifique '}
        {props.route.params['logementType'].toLowerCase()} de {props.route.params['nombrepiece']} pièces !
      </Card.Title>
      <Card.Divider/>
        <Card.Image source={{ uri: props.route.params['image']}}></Card.Image>
      <Card.Divider/>
       
        <Text style={{fontWeight: 'bold', marginBottom: 10, textAlign: 'center'}}> { props.route.params['logementType'] == 'Appartement' ? 'Superbe ' : 'Magnifique '}
        {props.route.params['logementType'].toLowerCase()} de {props.route.params['nombrepiece']} pièces { props.route.params['logementType'] == 'Appartement' ? 'en plein centre-ville.' : 'en périphérique. '}</Text> 
        
        <Text style={{fontWeight: 'bold', color: 'red', textAlign: 'right'}}>{props.route.params['prix']}€</Text>
        <Text><Text style={{fontWeight: 'bold'}}>Superficie: </Text>{props.route.params['surface']}</Text>   
        <Text><Text style={{fontWeight: 'bold'}}>Ville: </Text>{props.route.params['codePostal']} {props.route.params['ville']}</Text> 
        <Text><Text style={{fontWeight: 'bold'}}>Orientation: </Text>{props.route.params['orientation']}</Text>
        <Text style={{textAlign: 'right', marginBottom: 10}}>{props.route.params['specificite']}</Text>          
        <Button onPress={() => navigation.navigate('Accueil')}
          title="Voir les autres biens" />
      </Card>
</View>
<View>
        {console.log(props.route.params['logementType'])} 
      <Card key={props.idPropriety}>
      <Card.Title>Contactez un agent</Card.Title>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>L'agent en charge de ce bien est Mickael.</Text>
        <Text><Text style={{fontWeight: 'bold'}}>Mail de l'agent: </Text> mickeal@lumina.fr</Text>   
        <Text><Text style={{fontWeight: 'bold'}}>Téléphone de l'agence: </Text> (+33) 02 35 24 76 87</Text>    
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