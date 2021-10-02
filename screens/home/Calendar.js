import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Text, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import * as api from '../../services/auth';
import { useAuth } from '../../providers/auth';
import { AppointmentType } from '../../hooks/appointmentHelp'

let { width } = Dimensions.get('window');

const Agenda = () => {

    const { state } = useAuth()
    const [error, setError] = useState(null)
    const [events, setEvents] = useState([])
    const user = state.user

    useEffect(() => {
        api.appointmentsList().then(response => {
            let data = response.appointment.filter(result => result.idUser === state.user.idUser)
            setEvents(data);
        }).catch(err => setError("Vous n'avez pas encore pris RDV avec notre agence :)"))
    }, [state.token, state.user.idUser])

    return (
        <SafeAreaView>
            <View>
                <Text style={{ color: 'purple', fontWeight: 'bold', marginBottom: 10 }}>{error}</Text>
                {
                    !events.length ?
                        <Text>Aucun rendez-vous</Text> :
                        events.map(item => {
                            return (
                                <Card key={item.idAppointment}>
                                    <Card.Title>{AppointmentType(item.appointmentType)}</Card.Title>
                                    <Card.Divider />
                                    <Card.Title>{item.appointmentMotif}</Card.Title>
                                    <Card.Divider />
                                    <Card.Title>{item.appointmentDate}</Card.Title>
                                </Card>
                            )
                        })
                }
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15
    },
    error: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
    }
});

export default Agenda