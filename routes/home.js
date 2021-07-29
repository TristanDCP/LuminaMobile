import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { useAuth } from '../providers/auth';
import HomeScreen from '../screens/home/Home';
import CalendarScreen from '../screens/home/Calendar';
import UpdateProfileScreen from '../screens/home/UpdateProfile';

const Tab = createBottomTabNavigator()

export default function HomeStack(props) {

  const { navigate } = props.navigation
  const { handleLogout } = useAuth()

  const SignoutScreen = () => {
    handleLogout()
    navigate('Auth')
  }

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
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="md-home" color={color} />,
          }}
        />
        <Tab.Screen 
          name="Calendrier" 
          component={CalendarScreen}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          }}calendar
        />
        <Tab.Screen 
          name="Profil" 
          component={UpdateProfileScreen}
          options={{
            tabBarIcon: ({ color }) => <AntDesign name="user" size={30} color={color} />,
          }}
        />
        <Tab.Screen 
          name="Logout"
          component={SignoutScreen}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="log-out"  color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}