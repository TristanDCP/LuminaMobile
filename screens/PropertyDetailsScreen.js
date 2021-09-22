import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import axios from 'axios';

export default function PropertyDetails(props) {
    const [isLoading, setLoading] = useState(true);
    const [infoProperty, setInfoProperty] = useState([])

    const id = props.route.params.idProperty;
    useEffect(() => {
        axios.get(`http://www.share-your-universe.com/public/api/v1/property/${id}`).then(response => {
            setInfoProperty(response.data);
            setLoading(false);
        });
    }, [id]);

    if (isLoading) {
        return (
            <View>
                <Text>Chargement des Données</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <View>
                <Card key={id}>
                    <Card.Title>Type de propriété : {infoProperty.parameters[1].valueParameter}</Card.Title>
                    <Card.Divider />
                    <Card.Image source={{uri: infoProperty.parameters[8].valueParameter}}></Card.Image>
                    <Card.Divider />
                    <Card.Title>Pièces</Card.Title>
                    {
                        infoProperty.pieces.map(piece =>
                            <Text key={piece.pieceName + ' : ' + piece.pieceSurface + " m²"}>- {piece.pieceName + ' : ' + piece.pieceSurface + " m²"} </Text>
                        )
                    }
                    <Card.Divider />
                    <Card.Title>Détails du Bien</Card.Title>
                    {
                        infoProperty.parameters.map(param =>
                            <Text key={param.keyParameter + ' : ' + param.valueParameter}>- {param.keyParameter + ' : ' + param.valueParameter} </Text>
                        ).slice(2, -1)
                    }
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