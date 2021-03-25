import React from 'react'
import { View,StatusBar } from 'react-native'
import colors from '../styles/colors'


export default function (){
     return(

        <View>
<StatusBar
        animated={true}
        backgroundColor={colors.themeColor}
         />
        </View>
     )
}