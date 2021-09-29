import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';

import Slider from '@react-native-community/slider';
import Checkbox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';

const namesAddonsProperties = ['Terrasse', 'Balcon', 'Jardin', 'Piscine', 'Cheminée', 'Bureau', 'Cuisine Aménagée', 'Grenier', 'Cave', 'Garage', 'Plein Pied', 'Dressing', 'Ascenseur',];

export default function HomePage() {

    const propertiesFiltered = (property, filtersKey) => {
        return property.filter(eachProperty => {
            let parametersKey = eachProperty.parameters.map(eachKey => eachKey.keyParameter);
            let parametersValue = eachProperty.parameters.map(eachValue => eachValue.valueParameter);

            return filtersKey.every(filter =>
                // filter[0] === 'Prix' ? parametersValue <= filter[1] && parametersKey.includes(filter[0]) : parametersKey.includes(filter[0]) && parametersValue.includes(filter[1].toString())
                parametersKey.includes(filter[0]) && filter[0] === 'Prix' ? parametersValue <= filter[1] : parametersValue.toString().includes(filter[1])
            );
        })
    }

    const [isLoading, setLoading] = useState(true);
    const [properties, allPropertyDatas] = useState([])
    const navigation = useNavigation();
    const [sliderValue, setSliderValue] = useState(0);

    const [valueParameterArray, setValueParameters] = useState([]);

    const [orientation, setOrientation] = useState([])

    const [typeProperties, setTypeProperties] = useState('');

    const [pieceProperties, setPieceProperties] = useState('');

    const [addonsProperties, setAddonsProperties] = useState([]);

    const [checkboxes, setCheckboxes] = useState([
        {
            id: 1,
            title: 'Terrasse',
            checked: false,
        },
        {
            id: 2,
            title: 'Balcon',
            checked: false,
        },
        {
            id: 3,
            title: 'Jardin',
            checked: false,
        },
        {
            id: 4,
            title: 'Piscine',
            checked: false,
        }
    ]);

    const onButtonPress = () => {
        const selectedCheckBoxes = checkboxes.find((cb) => cb.checked === true);
        alert(JSON.stringify(selectedCheckBoxes));
        // setValueParameters(valueParameter => ({ ...valueParameter, "Spécificités": selectedCheckBoxes }))
    }

    const toggleCheckBox = (id, index) => {
        const checkboxData = [...checkboxes];
        checkboxData[index].checked = !checkboxData[index].checked;
        setCheckboxes(checkboxData)
    }

    useEffect(() => {
        getAllProperties();
    }, []);

    const getAllProperties = () => {
        axios.get("http://www.share-your-universe.com/public/api/v1/properties")
            .then((response) => {
                // console.log(response.data.property)
                const propertyDatas = response.data;
                allPropertyDatas(propertyDatas);
                setLoading(false);
            })
            .catch(error => console.log('Error'));
    }

    const styles = StyleSheet.create({
        radioButton: {
            flexDirection: 'row',
        },
    });



    const handleSubmit = () => {
        // alert(JSON.stringify(valueParameterArray));
        allPropertyDatas({ 'property': propertiesFiltered(Object.values(properties.property), Object.entries(valueParameterArray)) });
    }

    if (isLoading) {
        return (
            <View>
                <Text>Chargement des Propriétés</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <View>
                <Text>Prix :</Text>
                <Slider
                    maximumValue={850000}
                    minimumValue={0}
                    minimumTrackTintColor='#298EA6'
                    maximumTrackTintColor='#47A8BD'
                    step={10000}
                    onValueChange={(newValue) => {
                        setSliderValue(newValue);
                        setValueParameters(valueParameter => ({ ...valueParameter, "Prix": sliderValue }));
                    }}
                    value={sliderValue}
                />


                <Text>Type de Propriété :</Text>
                <RadioButton.Group
                    value={typeProperties}
                >
                    <View>
                        <RadioButton.Item
                            value='Maison'
                            label='Maison'
                            onPress={() => {
                                setTypeProperties('Maison');
                                setValueParameters(valueParameter => ({ ...valueParameter, "Type de Bien": 'Maison' }))
                            }}
                        />
                    </View>

                    <View>
                        <RadioButton.Item
                            value='Appartement'
                            label='Appartement'
                            onPress={() => {
                                setTypeProperties('Appartement');
                                setValueParameters(valueParameter => ({ ...valueParameter, "Type de Bien": 'Appartement' }))
                            }}
                        />
                    </View>
                    <View>
                        <RadioButton.Item
                            value='Terrain'
                            label='Terrain'
                            onPress={() => {
                                setTypeProperties('Terrain');
                                setValueParameters(valueParameter => ({ ...valueParameter, "Type de Bien": 'Terrain' }))
                            }}
                        />
                    </View>
                    <View>
                        <RadioButton.Item
                            value='Commerce'
                            label='Commerce'
                            onPress={() => {
                                setTypeProperties('Commerce');
                                setValueParameters(valueParameter => ({ ...valueParameter, "Type de Bien": 'Commerce' }))
                            }}
                        />
                    </View>
                </RadioButton.Group>
                <Text>Orientation du Bien :</Text>
                <RadioButton.Group
                    value={orientation}
                >
                    <View>
                        <RadioButton.Item
                            value='Nord'
                            label='Nord'
                            onPress={() => {
                                setOrientation('Nord');
                                setValueParameters(valueParameter => ({ ...valueParameter, "Orientation": 'Nord' }))
                            }}
                        />
                    </View>

                    <View>
                        <RadioButton.Item
                            value='Sud'
                            label='Sud'
                            onPress={() => {
                                setOrientation('Sud');
                                setValueParameters(valueParameter => ({ ...valueParameter, "Orientation": 'Sud' }))
                            }}
                        />
                    </View>
                    <View>
                        <RadioButton.Item
                            value='Est'
                            label='Est'
                            onPress={() => {
                                setOrientation('Est');
                                setValueParameters(valueParameter => ({ ...valueParameter, "Orientation": 'Est' }))
                            }}
                        />
                    </View>
                    <View>
                        <RadioButton.Item
                            value='Ouest'
                            label='Ouest'
                            onPress={() => {
                                setOrientation('Ouest');
                                setValueParameters(valueParameter => ({ ...valueParameter, "Orientation": 'Ouest' }))
                            }}
                        />
                    </View>
                </RadioButton.Group>
                <Text>Nombre de Pièces :</Text>
                <TextInput
                    placeholder="Nombre de Pièces"
                    label="Nombre de Pièces"
                    onChangeText={(newValue) => {
                        setPieceProperties(newValue);
                        setValueParameters(valueParameter => ({ ...valueParameter, "Pièces": pieceProperties }));
                    }}
                    value={pieceProperties}
                />
                {/* {
                    checkboxes.map((cb, index) => {
                        return (
                            <TouchableOpacity onPress={() => toggleCheckBox(cb.id, index)}  key={cb.id}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Checkbox
                                        key={cb.id}
                                        checked={cb.checked}
                                    />
                                    <Text>{cb.title}</Text>
                                </View>
                            </TouchableOpacity>

                        )
                    })
                } */}
                <Button
                    title="Filtrer"
                    onPress={() => handleSubmit()}
                />

            </View>
            <View>
                {
                    Object.keys(properties.property).map((items) => {
                        return (
                            <Card key={items.toString()}>
                                <Card.Title>Type de propriété : {properties.property[items]["parameters"][1].valueParameter}</Card.Title>
                                <Card.Divider />
                                <Card.Image source={{ uri: properties.property[items]["parameters"][8].valueParameter.toString() }}></Card.Image>
                                <Card.Divider />
                                <Text style={{ marginBottom: 10 }}>
                                    {properties.property[items]["parameters"][2].valueParameter}, {properties.property[items]["parameters"][4].valueParameter} , {properties.property[items]["parameters"][5].valueParameter}, {properties.property[items]["parameters"][7].valueParameter} , {properties.property[items]["parameters"][0].valueParameter}€
                                </Text>

                                <Button
                                    onPress={() => navigation.navigate('PropertyDetails', { idProperty: properties.property[items].idProperty })}
                                    title="+ d'informations"
                                />
                            </Card>
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}