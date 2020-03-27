import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Incidents from './components/Incidents';
import Detail from './components/Detail';


const AppStack = createStackNavigator();

function Routes(){
  return(

    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name='Incidents' component={Incidents}/>
        <AppStack.Screen name='Detail' component={Detail}/>
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;