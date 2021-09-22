import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

import Slider from '@react-native-community/slider';

export default function HomePage() {

    const [properties, allPropertyDatas] = useState([])
    const navigation = useNavigation();

    useEffect(() => {
        getAllProperties();
    }, []);

    const getAllProperties = () => {
        axios.get("http://www.share-your-universe.com/public/api/v1/properties")
            .then((response) => {
                // console.log(response.data.property)
                const propertyDatas = response.data.property;
                allPropertyDatas(propertyDatas);
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


    return (
        <ScrollView>
            <View>
                {Object.keys(properties).map((items) => {
                    return (
                        <Card key={items.toString()}>
                            <Card.Title>Type de propriété : {properties[items]["parameters"][1].valueParameter}</Card.Title>
                            <Card.Divider />
                            <Card.Image source={{ uri: properties[items]["parameters"][8].valueParameter.toString() }}></Card.Image>
                            <Card.Divider />
                            <Text style={{ marginBottom: 10 }}>
                                {properties[items]["parameters"][2].valueParameter}, {properties[items]["parameters"][4].valueParameter} , {properties[items]["parameters"][5].valueParameter}, {properties[items]["parameters"][7].valueParameter} , {properties[items]["parameters"][0].valueParameter}€
                            </Text>

                            <Button
                                onPress={() => navigation.navigate('PropertyDetails', { idProperty: properties[items].idProperty, })}
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