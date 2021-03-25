import axios from 'axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import imagePath from '../../constants/imagePath';
import api from '../../redux/actions';
import navigationStrings from '../../constants/navigationStrings';
import fontFamily from '../../styles/fontFamily';
import Validation from '../../utils/validation';

import StatusBar from '../../Components/StatusBar';
import AuthHeader from '../../Components/AuthHeader';
import colors from '../../styles/colors';

import ButtonWithLoader from '../../Components/Button';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      moviesbd: [],
      resourcePath: imagePath.camera,

      email: '',
      password: '',
      bgUrl: imagePath.bg4,
    };
  }

  handleInputs = (key) => {
    return (value) => {
      this.setState({[key]: value});
    };
  };

  onLogPress = () => {
    this.handleInputs;
    this.isValidData();
    this.apiCall();
    // this.apicall2();
  };

  apiCall = () => {
    // alert("Api Call")
    const {email, password} = this.state;
    if (this.isValidData()) {
      // alert('Valid Data');
      console.log({
        name: email,
        password: password,
      });
      api
        .login({
          email: email,
          password: password,
        })
        .then((res) => {
          this.setState({isLoading: false});
          console.log(res);
          this.props.navigation.navigate(navigationStrings.HOME_PAGE);
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.log(error);
        });
    }
  };

  isValidData = () => {
    const {email, password} = this.state;
    //  alert()
    const error = Validation({email, password});
    if (error) {
      // alert(error);
      showMessage({
        message: error,
        type: 'danger',
        icon: 'danger',
      });
      return false;
    }

    showMessage({
      message: 'Sucessfully Login',
      type: 'success',
      icon: 'sucess',
    });

    return true;
  };

  render() {
    // console.log(arr)
    const {bgUrl, resourcePath} = this.state;
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView>
        <View style={{flex: 1}}>
          <StatusBar />
          <AuthHeader text={'LOGIN'} />
          <View
            style={{height: 150, margin: 10, justifyContent: 'space-around'}}>
            <TextInput
              placeholderTextColor={colors.themeColor}
              placeholder="Email"
              style={styles.textInput}
              onChangeText={this.handleInputs('email')}
            />

            <TextInput
              placeholderTextColor={colors.themeColor}
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={this.handleInputs('password')}
            />
          </View>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate(navigationStrings.MOBILE_LOGIN)
            }
            style={styles.mobileLogBtn}>
            <Text style={{color: colors.white}}>Login via OTP</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20}}>
            <ButtonWithLoader
              btnText={'LOG IN'}
              color={colors.white}
              btnStyle={styles.btnStyle}
              onPress={this.onLogPress}
            />
          </View>

          <View style={styles.socialRow}>
            <View style={styles.hyphen} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.hyphen} />
          </View>

          <View style={styles.socialIconView}>
            <TouchableOpacity>
              <View style={styles.iconView}>
                <Image
                  style={styles.textFacebook}
                  source={imagePath.facebookImage}
                />
                <Text>FACEBOOK</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconView2}>
                <Image
                  style={styles.textGoogle}
                  source={imagePath.googleImage}
                />
                <Text>GOOGLE</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 75,
            }}>
            <Text
              onPress={() => {
                this.props.navigation.navigate(navigationStrings.SIGNUP);
              }}
              style={styles.alreadyText}>
              New to HealthKart? Sign Up
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Login;
const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 2,
    // width: 380,
    //  backgroundColor: '#4DB8BA',
    borderRadius: 5,
    fontSize: 18,
    padding: 10,
    // borderRadius:20
    borderBottomColor: colors.themeColor,
  },

  alreadyText: {
    color: colors.themeColor,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fontFamily.lobester,
  },

  btnStyle: {
    backgroundColor: colors.themeColor,
    width: 400,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  hyphen: {
    width: 130,
    height: 1,
    backgroundColor: colors.textGrey,
    opacity: 0.6,
  },
  orText: {
    lineHeight: 24,
    textAlign: 'center',
    // fontFamily: fontFamily.medium,
    opacity: 0.6,
    marginTop: 0,
    marginHorizontal: 16,
  },
  socialIconView: {
    marginTop: 50,
    flexDirection: 'row',
    marginVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  iconView: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 5,
    borderColor: colors.btnABlue,
    borderRadius: 5,
    marginRight: 20,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconView2: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.orange,
    borderRadius: 5,
    width: 150,
    padding: 5,
  },
  textFacebook: {height: 30, width: 30, marginRight: 3},
  textGoogle: {height: 30, width: 30, marginRight: 10},

  mobileLogBtn: {
    alignItems: 'center',
    backgroundColor: colors.themeColor,
    height: 20,
    borderRadius: 20,
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 15,
  },
});
