import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Text, Alert } from 'react-native';
import moment from "moment";
import EventCalendar from 'react-native-events-calendar';

import * as api from '../../services/auth';
import { useAuth } from '../../providers/auth';

let {width} = Dimensions.get('window');

const Agenda = () => {

  const { state } = useAuth()
  const [error, setError] = useState(null)
  const [events, setEvents] = useState([])
  const user = state.user

  useEffect( () => {
    api.appointmentsList().then(response => {
      let data = response.appointment.filter(result => result.idUser === state.user.idUser)
      console.log(data)
      setEvents({
        start: data[0].appointmentDate,
        end: data[0].appointmentDate,
        title: data[0].appointmentMotif,
        summary: data[0].appointmentType
      })
    }).catch( err => setError("Vous n'avez pas encore pris RDV avec notre agence :)") )
  }, [state.token, state.user.idUser])

  const eventClicked = (event) => {
    //On Click of event showing alert from here
    Alert.alert(
      `${event}`,
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  };
  
  
  return(
    <SafeAreaView style={styles.container}>
      {/* <ErrorText error={error} /> */}
      <View style={styles.container}>
        <Text style={{color: 'purple', fontWeight: 'bold', marginBottom: 10}}>{error}</Text>
        { user.role == 1 ? 
        <Text>Votre prochain RDV est le {events.appointmentDate} avec pour objet {events.appointmentMotif} </Text> :
        <EventCalendar
          eventTapped={eventClicked}
          // Function on event press
          events={events}
          // Passing the Array of event
          width={width}
          // Container width
          size={60}
          // number of date will render before and after initDate
          // (default is 30 will render 30 day before initDate
          // and 29 day after initDate)
          initDate={moment().toDate()}
          // Show initial date (default is today)
          scrollToFirst
          // Scroll to first event of the day (default true)
        />
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