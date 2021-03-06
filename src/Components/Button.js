import React from 'react'
import {View,TouchableOpacity,Text,ActivityIndicator}from 'react-native'
import colors from '../styles/colors';

const ButtonWithLoader = ({
    onPress = () => {},
    btnText = '',
    btnTextStyle = {},
    btnStyle = {},
    isLoading = false,
    color = colors.white,
  }) => {
    return (
      <TouchableOpacity
        style={{
          ...btnStyle
        }}
        onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <Text style={{color}}>
            {btnText}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  
  export default ButtonWithLoader;
  