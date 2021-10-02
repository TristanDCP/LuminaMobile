import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { useAuth } from '../providers/auth';

import { DefaultStackNavigator } from './auth';
import CalendarScreen from '../screens/home/Calendar';
import UpdateProfileScreen from '../screens/home/UpdateProfile';
import AgenciesListScreen from '../screens/home/agencies';
import GeneratePDFScreen from '../screens/home/GeneratePDF';

const Tab = createBottomTabNavigator()

export default function HomeStack(props) {

  const { navigate } = props.navigation
  const { handleLogout } = useAuth()

  const SignoutScreen = () => {
    handleLogout()
    return null
  }



  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={DefaultStackNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Agences"
        component={AgenciesListScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="bars" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Calendrier"
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }} calendar
      />
      <Tab.Screen
        name="Profil"
        component={UpdateProfileScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="État des Lieux"
        component={GeneratePDFScreen}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="pdffile1" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Logout"
        component={SignoutScreen}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="log-out" color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}