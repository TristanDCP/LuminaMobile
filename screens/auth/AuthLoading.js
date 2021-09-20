import React, { useEffect } from 'react'
import {
  ActivityIndicator,
  View,
  Text
} from 'react-native'
import { StackActions } from '@react-navigation/native'

import { useAuth } from '../../providers/auth'

export default function AuthLoading(props) {
  //const { navigate } = props.navigation
  const { getAuthState } = useAuth()

  useEffect(() => {
    initialize()
  }, [])

  async function initialize() {
    try {
      const { user } = await getAuthState()

      if(user) {
        let username = !!(user.username)
        
        if(username) navigation.navigate('App')
        else navigation.navigate('Auth', {}, StackActions.replace({ routeName: "Dashboard" }))
        
      } else navigation.navigate('Auth')
    } catch(e) {
      navigation.navigate('Auth')
    }
  }

  return(
    <View style={{ 
      backgroundColor: '#fff', 
      alignItems: 'center', 
      justifyContent: 'center', 
      flex: 1 
    }}>
      <ActivityIndicator />
      <Text>{"Chargement des informations utilisateurs"}</Text>
    </View>
  )
}