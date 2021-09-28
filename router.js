import React from 'react'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

// Import Routes
import AuthStack from './routes/auth'
import HomeStack from './routes/home'

import AuthLoading from './screens/auth/AuthLoading'
import AuthProvider from './providers/auth'

import Nav from './routes/nav'

const AppStack = createSwitchNavigator(
  {
    Loading: AuthLoading,
    Auth: AuthStack,
    App: HomeStack
  },
  {
    initialRouteName: 'Loading'
  }
)

const Navigator = createAppContainer(AppStack)

export default function Router() {
  return(
    <AuthProvider>
      <Nav />
    </AuthProvider>
  )
}