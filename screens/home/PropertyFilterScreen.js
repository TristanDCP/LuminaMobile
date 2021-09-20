import * as React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, RadioButton } from 'react-native';
import { Card, ListItem, Button, Icon  } from 'react-native-elements';
// import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
// import {Picker} from '@react-native-picker/picker';
import PropertyAfterFilter from './PropertyAfterFilterScreen';


export default function PropertyFilter(){

  const [properties, allPropertyDatas] = useState([])
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState(1);
  const [sliderValue, setSliderValue] = useState(0);
  const [checked, setChecked] = React.useState('Maison');
  const [checkedOr, setCheckedOr] = React.useState('Nord');

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

  let dataJSON = properties;



  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={{marginBottom: 10}}>Prix maximum :</Text>
        {/* <Slider
          maximumValue={100000}
          minimumValue={0}
          minimumTrackTintColor="#298EA6"
          maximumTrackTintColor="#47A8BD"
          step={1}
          value={sliderValue}
          onValueChange={
            (sliderValue) => setSliderValue(sliderValue)
          }
        /> */}
      <Text style={{color: 'black', paddingLeft: (sliderValue/330), marginLeft: 12}}>
            {sliderValue}
        </Text>
        <Text>Type de Biens : </Text>
        <View >
          <View style={styles.radiostyle}>


                  <Text>Maison</Text>
                  <RadioButton
                  value="Maison"
                  status={ checked === 'Maison' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('Maison')}
                />
                <Text>Appartement</Text>
                <RadioButton
                  value="Appartement"
                  status={ checked === 'Appartement' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('Appartement')}
                />

          </View>
         <View style={styles.radiostyle}>
         <Text>Terrain</Text>
                <RadioButton
                  value="Terrain"
                  status={ checked === 'Terrain' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('Terrain')}
                />

          <Text>Commerce</Text>
                <RadioButton
                  value="Commerce"
                  status={ checked === 'Commerce' ? 'checked' : 'unchecked' }
                  onPress={() => setChecked('Commerce')}
                />
         </View>         
        </View>
        <Text>Orientation : </Text>
              <View >
                <View style={styles.radiostyle}>

                      <Text>Nord</Text>
                          <RadioButton
                          value="Nord"
                          status={ checkedOr === 'Nord' ? 'checked' : 'unchecked' }
                          onPress={() => setCheckedOr('Nord')}
                          />
                          <Text>Sud</Text>
                          <RadioButton
                          value="Sud"
                          status={ checkedOr === 'Sud' ? 'checked' : 'unchecked' }
                          onPress={() => setCheckedOr('Sud')}
                          />
                </View>
                <View style={styles.radiostyle}>
                <Text>Est</Text>
                          <RadioButton
                          value="Est"
                          status={ checkedOr === 'Est' ? 'checked' : 'unchecked' }
                          onPress={() => setCheckedOr('Est')}
                          />

                          <Text>Ouest</Text>
                          <RadioButton
                          value="Ouest"
                          status={ checkedOr === 'Ouest' ? 'checked' : 'unchecked' }
                          onPress={() => setCheckedOr('Ouest')}
                          />
                </View>





              </View>



        <Text style={{marginBottom: 10}}>Combien de pièces : </Text>
{/* 
        <Picker style={{marginBottom: 30}}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5+" value="5" />
        </Picker> */}
          <Button title="Valider votre recherche" onPress={() => navigation.navigate('PropertyAfterFilter', 

          {
            Valeur: sliderValue,
            Type: checked,
            Orientation : checkedOr,
            Piece : selectedLanguage,
          }
          ) }></Button>
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