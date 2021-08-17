import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Default Screens
import HomeScreen from '../screens/HomePageScreen';
import PropertyDetailsScreen from '../screens/PropertyDetailsScreen';

// Login Screens
import RegisterScreen from '../screens/auth/Register';
import DashboardScreen from '../screens/auth/Dashboard';

import UpdateProfileScreen from '../screens/auth/updateProfile';
import LoginScreen from '../screens/auth/Login';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';
import CalendarScreen from '../screens/auth/Calendar';

import { headerStyle, headerTitleStyle } from '../theme'
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator()

export default function AuthStack(props) {

  const { navigate } = props.navigation

  return(
    <NavigationContainer
      tabBarOptions={{
        activeBackgroundColor: '#298EA6',
        inactiveBackgroundColor: '#47A8BD',
        activeTintColor: "white",
        inactiveTintColor: "white"
      }}
    >
      <Tab.Navigator>
        <Tab.Screen 
          name="Accueil"
          component={DefaultStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
          }}
        />
        <Tab.Screen 
          name="Se connecter"
          component={LoginStackNavigator}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="log-in"  color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const Stack = createStackNavigator()

const DefaultStackNavigator = () => {
  return(
    <Stack.Navigator 
      screenOptions={{
        headerStyle: headerStyle, 
        headerTitleStyle: headerTitleStyle
      }}>
      <Stack.Screen 
        name="Accueil"
        component={HomeScreen}
        options={{ title: 'Accueil' }}
      />
      <Stack.Screen 
        name="PropertyDetails"
        component={PropertyDetailsScreen}
        options={{ title: 'Détail' }}
      />
    </Stack.Navigator>
  )  
}

export { DefaultStackNavigator }

const LoginStackNavigator = () => {
  return(
    <Stack.Navigator 
      screenOptions={{
        headerStyle: headerStyle, 
        headerTitleStyle: headerTitleStyle
      }}>
      <Stack.Screen 
        name="Login"
        component={LoginScreen}
        options={{ title: 'Se connecter' }}
      />
      <Stack.Screen 
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: 'Mot de passe oublié' }}
      />
      <Stack.Screen 
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: 'Tableau de bord' }}
      />
      <Stack.Screen 
        name="UpdateProfil"
        component={UpdateProfileScreen}
        options={{ title: "Mettre à jour mon profil" }}
      />
      <Stack.Screen 
        name="Calendar"
        component={CalendarScreen}
        options={{ title: "Votre calendrier" }}
      />
      <Stack.Screen 
        name="Register"
        component={RegisterScreen}
        options={{ title: "S'inscrire" }}
      />
    </Stack.Navigator>
  )
}

export { LoginStackNavigator }