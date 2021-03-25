import React from 'react';
import {Component} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import StatusBar from '../../Components/StatusBar';
import Headers from '../../Components/Header';
import imagePath from '../../constants/imagePath';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import colors from '../../styles/colors';
import {clearUserData} from '../../utils/utils';
import actions from '../../redux/actions';
export default class Profile extends Component {
  onLogout = () => {
    actions.deleteUserData();
  };
  render() {
    return (
      <View style={{backgroundColor: colors.lightGreyBg}}>
        <StatusBar />
        <Headers />
        <View
          style={{
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.backgroundGrey,
          }}>
          <View
            style={{
              height: 150,
              width: 150,
              alignSelf: 'center',
              backgroundColor: colors.lightGreyBg,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Image
              style={{height: 120, width: 120}}
              source={imagePath.profile}
            />
          </View>
        </View>
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 10,
            marginTop: 5,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>ORDERS</Text>
        </View>
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 10,
            marginTop: 5,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>HELP</Text>
        </View>
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 10,
            marginTop: 5,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>WISHLIST</Text>
        </View>
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            justifyContent: 'center',
            backgroundColor: 'white',
            padding: 10,
            marginTop: 5,
          }}>
          <TouchableOpacity onPress={this.onLogout}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
