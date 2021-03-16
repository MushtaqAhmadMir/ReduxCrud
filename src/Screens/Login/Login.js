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
import api from '../../apis';
import navigationStrings from '../../constants/navigationStrings';
import fontFamily from '../../styles/fontFamily';
import Validation from '../../utils/validation';
import HomePage from '../Home/HomePage';

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
    //  alert("Api Call")
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
      alert(error);
      showMessage({
        message: error,
        type: 'danger',
        icon: 'danger',
      });
      return false;
    }

    showMessage({
      message: 'Sucessfully SignUp',
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
        <ImageBackground source={bgUrl} style={styles.container}>
          <View style={styles.upperRow}>
            <Image style={styles.upperArrow} source={imagePath.leftArrow} />
            <View style={styles.logoView}>
              <TouchableOpacity>
                <Image style={styles.imgLogo} source={resourcePath} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.loginTextView}>
            <Text style={styles.loginText}>Psilogica</Text>
          </View>

          <View style={styles.fieldView}>
            <TextInput
              placeholderTextColor="white"
              placeholder="Email"
              style={styles.textInput}
              onChangeText={this.handleInputs('email')}
            />
            <TextInput
              placeholderTextColor="white"
              placeholder="Password"
              secureTextEntry={true}
              style={styles.textInput}
              onChangeText={this.handleInputs('password')}
            />

            <Image
              style={styles.emailIcon}
              source={{
                uri: 'https://www.iconsdb.com/icons/preview/white/user-xl.png',
              }}
            />

            <Image
              style={styles.passwordIcon}
              source={{
                uri: 'https://www.iconsdb.com/icons/preview/white/lock-xxl.png',
              }}
            />
          </View>
          <Text style={styles.forgotText}>Forgot Password?</Text>

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
              New to Flipkart? Sign Up
            </Text>
          </View>
        </ImageBackground>
        {/* <FlashMessage position="top"/> */}
        <View style={styles.radiusView}>
          <TouchableOpacity style={styles.loginBtn} onPress={this.onLogPress}>
            <Image style={styles.loginLogo} source={imagePath.rightArrow} />
          </TouchableOpacity>
          <View style={styles.iconView}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20}}>
                --------------- LOGIN USING ----------------
              </Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity style={styles.iconFb}>
                  <Image
                    style={styles.icon1}
                    source={{
                      uri:
                        'https://www.iconsdb.com/icons/preview/white/facebook-xl.png',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconFb}>
                  <Image
                    style={styles.icon1}
                    source={{
                      uri:
                        'https://www.iconsdb.com/icons/preview/white/instagram-xxl.png',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconFb}>
                  <Image
                    style={styles.icon1}
                    source={{
                      uri:
                        'https://www.iconsdb.com/icons/preview/white/gmail-login-xxl.png',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* <HomePage  /> */}
      </KeyboardAwareScrollView>
    );
  }
}

export default Login;
const styles = StyleSheet.create({
  container: {
    height: 700,
    flex: 1,
    resizeMode: 'contain',
  },
  upperRow: {
    // backgroundColor:"red",
    flexDirection: 'row',
    height: 60,
    //  ,justifyContent:"center"
    alignItems: 'center',
    height: 50,
    justifyContent: 'space-between',
    margin: 10,
  },
  upperArrow: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  logoView: {
    height: 100,
    justifyContent: 'center',
  },
  imgLogo: {
    height: 50,
    width: 50,
  },
  loginTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
  },
  loginText: {
    fontFamily: fontFamily.lobester,
    fontSize: 45,
    color: 'white',
  },
  textInput: {
    borderBottomWidth: 0.5,
    width: 380,
     backgroundColor: '#4DB8BA',
     borderRadius: 5,
    fontSize: 18,
    paddingLeft: 50,
    borderRadius:20
    // borderBottomColor: 'white',
  },
  emailIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
    left: 30,
    top: 60,
    // tintColor: 'darkgrey',
  },
  passwordIcon: {
    height: 30,
    width: 30,
    position: 'absolute',
    left: 30,
    top: 150,
    // tintColor: 'darkgrey',
  },
  loginLogo: {
    height: 30,
    width: 30,
  },
  alreadyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: fontFamily.lobester,
  },

  fieldView: {
    height: 240,
    alignItems: 'center',
    position: 'relative',
    justifyContent: 'space-around',
    padding: 30,
    // backgroundColor: 'yellow',
  },
  upperArrow: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  textLogo: {
    fontWeight: 'bold',
    fontSize: 25,
    marginLeft: 140,
  },
  socialLogin: {
    height: 200,
    // backgroundColor:"red"
    alignItems: 'center',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
  },
  radiusView: {
    position: 'relative',
    backgroundColor: 'white',
    height: 255,
    borderTopEndRadius: 80,
    borderTopLeftRadius: 80,
    marginTop: -230,
    // width:500,
  },
  socialIcons: {
    height: 40,
    // backgroundColor:"yellow",
    flexDirection: 'row',
    justifyContent: 'center',
    justifyContent: 'space-around',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: 40,
    width: 300,
    marginTop: 40,
  },
  iconFb: {
    backgroundColor: '#66ffff',
    borderRadius: 30,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon1: {
    height: 30,
    width: 30,
  },
  loginBtn: {
    position: 'absolute',
    backgroundColor: 'white',
    top: -30,
    left: 175,
    borderRadius: 100,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  iconView: {
    // backgroundColor:"red",
    marginTop: 100,
  },
  forgotText: {
    color: 'white',
    marginTop: -30,
    marginLeft: 250,
    fontSize: 18,
    width: 150,
    fontFamily: fontFamily.lobester,
  },
});
