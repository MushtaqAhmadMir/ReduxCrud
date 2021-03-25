import React from 'react'
import {View,Text,TouchableOpacity,Image,TextInput,StyleSheet} from 'react-native'
import BatchedBridge from 'react-native/Libraries/BatchedBridge/BatchedBridge'
import imagePath from '../constants/imagePath'
import navigationStrings from '../constants/navigationStrings'
import colors from '../styles/colors'


export default function Header(props) {
  const{navigation}=props
    return(
        <View style={styles.navbar}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row", margin: 10 }}>
            <Image
              style={{ height: 60, width: 60 ,tintColor:"#36B6B0"}}
              source={{
                uri:
                  "https://icon-library.com/images/white-menu-icon/white-menu-icon-12.jpg",
              }}
            />
            <Text style={{color:"#36B6B0",fontSize:25,marginTop:12}}>HEALT<Text style={{backgroundColor:"#36B6B0",color:"white"}}>HK</Text>ART</Text>
          </View>
          <View style={{ flexDirection: "row", margin: 20 }}>
            <Image
              style={{ height: 30, width: 30, marginRight: 15 }}
              source={{
                uri:
                  "https://o.remove.bg/downloads/85c88e53-402c-4f88-bde1-f46f9b6a75ae/kissclipart-notifications-icon-0944b9061b6f136e-removebg-preview.png",
              }}
            />
            <TouchableOpacity
              // {newItem:cartArray, price:price }
                onPress={()=>navigation.navigate(navigationStrings.CART)}
            >
              <Image
                style={{ height: 27, width: 27 }}
                source={imagePath.cart}
              />
            </TouchableOpacity>
          </View>
        </View>

      </View>
)
    }
    // export default Header;
    const styles = StyleSheet.create({
        navbar: {
          backgroundColor: "white",
          height: 80,
          borderBottomWidth:.6,
          borderBottomColor:colors.lightGreyBg
        },
    })