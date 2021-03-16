import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';

const Stack = createStackNavigator();

export default function ({isLoggedIn}) {
  console.log(isLoggedIn, 'hello');
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn && AuthStack(Stack)}
        {MainStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
