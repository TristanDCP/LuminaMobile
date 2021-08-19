import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Dimensions, Text } from 'react-native';
import moment from "moment";
import EventCalendar from 'react-native-events-calendar';

import * as api from '../../services/auth';
import { useAuth } from '../../providers/auth';
import { ErrorText } from '../../components/Shared';
import { maybeCompleteAuthSession } from 'expo-web-browser';

//get the size of device
let {width} = Dimensions.get('window');

const Agenda = () => {

  const { state } = useAuth()
  const [error, setError] = useState(null)
  const [events, setEvents] = useState([])
  const user = state.user
  // const [events, setEvents] = useState([
  //   {
  //     start: '2021-07-09 14:00:00',
  //     end: '2021-07-09 15:30:00',
  //     title: 'New Year Party',
  //     summary: 'xyz Location',
  //   },
  //   {
  //     start: '2020-01-01 01:00:00',
  //     end: '2020-01-01 02:00:00',
  //     title: 'New Year Wishes',
  //     summary: 'Call to every one',
  //   },
  //   {
  //     start: '2020-01-02 00:30:00',
  //     end: '2020-01-02 01:30:00',
  //     title: 'Parag Birthday Party',
  //     summary: 'Call him',
  //   },
  //   {
  //     start: '2020-01-03 01:30:00',
  //     end: '2020-01-03 02:20:00',
  //     title: 'My Birthday Party',
  //     summary: 'Lets Enjoy',
  //   },
  //   {
  //     start: '2020-02-04 04:10:00',
  //     end: '2020-02-04 04:40:00',
  //     title: 'Engg Expo 2020',
  //     summary: 'Expoo Vanue not confirm',
  //   },
  // ]);
  //   {
  //     start: '2021-07-09 14:00:00',
  //     end: '2021-07-09 15:30:00',
  //     title: 'New Year Party',
  //     summary: 'xyz Location',
  //   },
  useEffect( () => {
    api.appointmentsList().then(response => {
      //setEvents(response.appointment.filter(result => result.idUser === state.user.idUser))
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
    alert(JSON.stringify(event));
  };
  
  
  return(
    <SafeAreaView style={styles.container}>
      {/* <ErrorText error={error} /> */}
      <View style={styles.container}>
        <Text style={{color: 'purple', fontWeight: 'bold', marginBottom: 10}}>{error}</Text>
        {/* { events != null ? <Text style={{color: 'purple', fontWeight: 'bold', marginBottom: 10}}>Vous avez {events.lenght} RDV.</Text>: null} */}
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