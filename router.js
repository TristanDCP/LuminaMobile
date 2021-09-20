import React, { useEffect, useState } from 'react'

// Import Routes
import AuthStack from './routes/auth'
import HomeStack from './routes/home'

import AuthLoading from './screens/auth/AuthLoading'
import AuthProvider from './providers/auth'

import Reactotron from 'reactotron-react-native'
import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth, AuthContext } from './providers/auth'

// const AppStack = createSwitchNavigator(
//   {
//     Loading: AuthLoading,
//     Auth: AuthStack,
//     App: HomeStack
//   },
//   {
//     initialRouteName: 'Loading'
//   }
// )

// const Navigator = createAppContainer(AppStack)

export default function Router() {
  
  const [loading, setLoading] = useState(true)
  const user = useState('')



  return(
    <AuthProvider>
      {user ? (
        <AuthStack />
      ) : (
        <HomeStack />
      )}
      
      
    </AuthProvider>
  )
}