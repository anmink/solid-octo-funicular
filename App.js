import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './Screens/Home'
import Upload from './Screens/Upload'
import Prediction from './Screens/Prediction'
import Test from './Screens/Test'
import Classification from './Screens/Classification'

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen name="Prediction" component={Prediction} />
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="Classification" component={Classification} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
