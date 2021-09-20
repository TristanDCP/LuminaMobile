import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { useAuth } from '../providers/auth';

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