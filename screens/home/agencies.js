import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';

export default function Agencies() {
    const [agenciesList, setAgencies] = useState([])

    useEffect(() => {
        axios.get("http://www.share-your-universe.com/public/api/v1/agencies")
            .then(response => {
                setAgencies(response.data.agency);
            });
    }, []);

    return (
        <ScrollView>
            <View style={{
                flex: 1,
                paddingHorizontal: 16,
                backgroundColor: '#fff',
            }}>
                <View style={{ flex: 1 }}>
                    {
                        agenciesList.map((singleAgency) => {
                            return (
                                <Card key={singleAgency.agencyName}>
                                    <Card.Title>{singleAgency.agencyName}</Card.Title>
                                    <Card.Divider />
                                    <Card.Image source={{ uri: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }}></Card.Image>
                                    <Card.Divider />
                                    <Text style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 16 }}>{singleAgency.agencyName}</Text>

                                    <Text><Text style={{ fontWeight: 'bold' }}>Mail de l'agence: </Text>{singleAgency.agencyContact}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Téléphone de l'agence: </Text>{singleAgency.agencyPhone}</Text>
                                    <Text><Text style={{ fontWeight: 'bold' }}>Adresse de l'agence: </Text>{singleAgency.agencyAdr}</Text>
                                </Card>
                            )
                        })
                    }
                </View>
            </View>
        </ScrollView>
    )
}

Agencies.navigationOptions = ({ }) => {
    return {
        title: `Liste des Agences`
    }
}