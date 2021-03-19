import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { connect } from 'react-redux';
const Stack = createStackNavigator();
function  Routes(props) {
  console.log(props.userData,"in routes")
  const{userData}=props
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userData && AuthStack(Stack)}
        {MainStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const mapStateToProps=state=>{

  return(
    {
      userData:state.auth.userData
    }
  )
}

export default connect(mapStateToProps)(Routes)