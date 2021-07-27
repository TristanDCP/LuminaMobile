import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'

// Import Screens
import RegisterScreen from '../screens/auth/Register'
import LoginScreen from '../screens/auth/Login'
import UsernameScreen from '../screens/auth/Username'
import ForgotPasswordScreen from '../screens/auth/ForgotPassword'

import { headerStyle, headerTitleStyle } from '../theme'

const AuthStack = createStackNavigator(
  {
    Register: RegisterScreen,
    Login: LoginScreen,
    Username: UsernameScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: () => ({ headerStyle, headerTitleStyle })
  }
)

export default AuthStack