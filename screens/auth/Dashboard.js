import React from 'react'
import { 
  Text,
  View,
  Button,
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
      <Text>{ user != undefined ? `Bonjour ${user.userLastname} ${user.userFirstname} (${user.userEmail}) ` : navigate('Login')}</Text>
      <Button title={'Mettre à jour mon profil'} onPress={ () => navigate('UpdateProfil') } />
      <Button title={'Voir mes RDV'} onPress={ () => navigate('Calendar') } />
      <Button title={'Se déconnecter'} onPress={ () => {
        handleLogout()
      }}/>
    </View>
  )
}