import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { connect } from 'react-redux';
const Stack = createStackNavigator();
function  Routes(props) {
    const {userData}=props
  //  const{name}=props.userData
  
      console.log(props.userData," userdata   in routes")
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userData.contactDetails && AuthStack(Stack)}
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