import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, StyleSheet, TextInput } from 'react-native';
import { Card, Button } from 'react-native-elements';

import Slider from '@react-native-community/slider';
import Checkbox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import SelectMultiple from 'react-native-select-multiple';

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

    const [orientation, setOrientation] = useState('');

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
        setCheckboxes(checkboxData);
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
        container: {
            flex: 1,
            padding: 24,
            backgroundColor: "#eaeaea"
        },
    });



    const handleSubmit = () => {
        alert(JSON.stringify(valueParameterArray));
        // allPropertyDatas({ 'property' : propertiesFiltered(Object.values(properties.property), Object.entries(valueParameterArray))});
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
                <RadioButton.Group
                    onValueChange={(newValue) => {
                        setTypeProperties(newValue);
                        setValueParameters(valueParameter => ({ ...valueParameter, "Type de Bien": typeProperties }));
                    }}
                    value={typeProperties}
                >
                    <RadioButton.Item
                        label='Maison'
                        value='Maison'
                        status={typeProperties === 'Maison' ? 'checked' : 'unchecked'}
                    />
                    <RadioButton.Item
                        label='Appartement'
                        value='Appartement'
                        status={typeProperties === 'Appartement' ? 'checked' : 'unchecked'}
                    />
                    <RadioButton.Item
                        label='Terrain'
                        value='Terrain'
                        status={typeProperties === 'Terrain' ? 'checked' : 'unchecked'}
                    />
                    <RadioButton.Item
                        label='Commerce'
                        value='Commerce'
                        status={typeProperties === 'Commerce' ? 'checked' : 'unchecked'}
                    />
                </RadioButton.Group>
                <RadioButton.Group
                    onValueChange={(newValue) => {
                        setOrientation(newValue);
                        setValueParameters(valueParameter => ({ ...valueParameter, "Orientation": orientation }))
                    }}
                    value={orientation}
                >
                    <RadioButton.Item
                        label='Nord'
                        value='Nord'
                        status={orientation === 'Nord' ? 'checked' : 'unchecked'}
                    />
                    <RadioButton.Item
                        label='Sud'
                        value='Sud'
                        status={orientation === 'Sud' ? 'checked' : 'unchecked'}
                    />
                    <RadioButton.Item
                        label='Est'
                        value='Est'
                        status={orientation === 'Est' ? 'checked' : 'unchecked'}
                    />
                    <RadioButton.Item
                        label='Ouest'
                        value='Ouest'
                        status={orientation === 'Ouest' ? 'checked' : 'unchecked'}
                    />
                </RadioButton.Group>
                <TextInput
                    placeholder="Nombre de Pièces"
                    label="Nombre de Pièces"
                    onChangeText={(newValue) => {
                        setPieceProperties(newValue);
                        setValueParameters(valueParameter => ({ ...valueParameter, "Pièces": pieceProperties }));
                    }}
                    value={pieceProperties}
                />
                {
                    checkboxes.map((cb, index) => {
                        return (
                            <View style={{ flexDirection: 'row' }} key={cb.id}>
                                <Checkbox
                                    key={cb.id}
                                    checked={cb.checked}
                                    onPress={() => toggleCheckBox(cb.id, index)}
                                />
                                <Text>{cb.title}</Text>
                            </View>
                        )
                    })
                }

                {/* <SelectMultiple
                    items={namesAddonsProperties}
                    selectedItem={addonsProperties}
                    onSelectionsChange={() => {
                        setAddonsProperties(addonsProperties);
                        setValueParameters(valueParameter => ({ ...valueParameter, "Spécificités": addonsProperties.join(' ') }));
                    }}
                /> */}
                <Button
                    title="Filtrer"
                    onPress={() => handleSubmit()}
                />

            </View>
            <View>
                {Object.keys(properties.property).map((items) => {
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
                                onPress={() => navigation.navigate('PropertyDetails', { idProperty: properties.property[items].idProperty, })}
                                title="+ d'informations"
                            />
                        </Card>
                    )
                }
                )
                }
            </View>
        </ScrollView>
    )
}