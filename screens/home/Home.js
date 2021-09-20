import React, { useState, useContext } from 'react'
import { 
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native'

import { useAuth } from '../../providers/auth'

export default function Home(props) {
  const { navigate } = props.navigation
  
  const { state, handleLogout } = useAuth()
  const user = state.user

  return(
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {user ? (
        <Text>{`Bonjour ${user.userLastname} ${user.userFirstname} (${user.userEmail})`}</Text>
      ) : (
        <Text>Hello world</Text>
      )}
      
      {/* <Text>{`Bonjour ${user.userLastname} ${user.userFirstname} (${user.userEmail})`}</Text> */}
      {/* <Button title={'Mettre à jour mon profil'} onPress={ () => navigate('UpdateProfile') } />
      <Button title={'Se déconnecter'} onPress={ () => {
        handleLogout()
        navigate('Auth')
      }}/> */}
    </View>
  )
}