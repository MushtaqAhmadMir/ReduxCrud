import React, {Component} from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Cart, Consult, Home, Profile, Workout} from '../Screens';
import colors from '../styles/colors';
import navigationStrings from '../constants/navigationStrings';
import imagePath from '../constants/imagePath';



const Tab = createBottomTabNavigator();

function TabRoutes({navigation}) {
  return (
    <Tab.Navigator
     initialRouteName="Home"
      tabBarOptions={{
        activeTintColor:colors.black,
      }} >
     <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home', showIcon:true,
          
           tabBarIcon:(activeTintColor)=>
           {
             return(
               <Image style={{height:30,width:30,tintColor:colors.themeColor}} source={imagePath.home} />
             )
           }
        }
        }
       
      />
        <Tab.Screen name="Consult" component={Consult}  options={{
          showIcon:true,
          tabBarLabel: 'Consult',
          tabBarIcon:({tintColor})=>
           {
             return(
               <Image style={{height:40,width:40,tintColor:colors.themeColor}} source={imagePath.heart} />
             )
           }
         
        }} />
        <Tab.Screen name="Cart" component={Cart}  options={{
          tabBarLabel: 'Cart',
          tabBarIcon:(tintColor)=>
           {
             return(
               <Image style={{height:30,width:30,tintColor:colors.themeColor}} source={imagePath.cart} />
             )
           }
         
        }} />
         <Tab.Screen name="Profile" component={Profile}  options={{
          tabBarLabel: 'Profile',
          tabBarIcon:({tintColor})=>
           {
             return(
               <Image style={{height:30,width:30,tintColor:colors.themeColor}} source={imagePath.profile} />
             )
           }
          
        }} />
     
       
      
     
    </Tab.Navigator>
  );
}


export default TabRoutes;