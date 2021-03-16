import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  PermissionsAndroid,
  ImageBackground,
  StatusBar,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FlashMessage, {
  showMessage,
  hideMessage,
} from 'react-native-flash-message';
import Validation from '../../utils/validation';
import api from '../../apis';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Loader from '../../Components/Loader';
import navigationStrings from '../../constants/navigationStrings';
import * as ImagePicker from 'react-native-image-picker';
import fontFamily from '../../styles/fontFamily';
import imagePath from '../../constants/imagePath';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath:"https://www.iconsdb.com/icons/preview/white/camera-xxl.png",
        
      isLoading: false,
      isDateTimePickerVisible: false,
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      bgUrl:
        'https://images.unsplash.com/photo-1557683325-3ba8f0df79de?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8&w=1000&q=80',
    };
  }

  showDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: true});
  };

  hideDateTimePicker = () => {
    this.setState({isDateTimePickerVisible: false});
  };

  handleDatePicked = (date) => {
    let birthDate = date.getDate();
    let monthDate = date.getMonth();
    let year = date.getFullYear();
    let newDateOfBirth = birthDate + '/' + monthDate + '/' + year;
    // console.log("A date has been picked: ", date);
    this.setState({dateOfBirth: newDateOfBirth});

    this.hideDateTimePicker();
  };

  handleInputs = (key) => {
    return (value) => {
      this.setState({[key]: value}, () => {
        // console.log(this.state)
      });
    };
  };

  onLogPress = () => {
    this.handleInputs;
    const {email, name, password, phoneNumber, confirmPassword} = this.state;
    this.isValidData();
    this.apiCall();
  };

  apiCall = () => {
    // alert("Api Call")
    const {email, name, password, phoneNumber, confirmPassword} = this.state;
    if (this.isValidData()) {
      //hit Api
      // alert("Valid Data")
      console.log({
        name: name,
        email: email,
        languageCode: 'EN',
        signupType: 'APP',
      });
      api
        .signup({
          name: name,
          email: email,
          password:password,
          languageCode: 'EN',
          signupType: 'APP',
        })
        .then((res) => {
          this.setState({isLoading: false});
          console.log(res);
          this.props.navigation.navigate(navigationStrings.HOME_PAGE)
        })
        .catch((error) => {
          this.setState({isLoading: false});
          console.log(error);
        });
    }
  };

  isValidData = () => {
    const {email, name, password, confirmPassword} = this.state;
    // alert()
    const error = Validation({email, name, password, confirmPassword});
    if (error) {
      showMessage({
        message: error,
        type: 'danger',
        icon: 'danger',
      });
      return false;
    }
    this.setState({isLoading: true});
    showMessage({
      message: 'Sucessfully SignUp',
      type: 'success',
      icon: 'sucess',
    });
    return true;
  };

  _profileimage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        ImagePicker.launchCamera(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
            saveToPhotos: true,
          },
          (response) => {
            console.log(response);
            this.setState({resourcePath: response});
          },
        );
        this.setState({isModalVisibal: false});
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  _profileImageFromGallery = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        ImagePicker.launchImageLibrary(
          {
            mediaType: 'photo',
            includeBase64: false,
            maxHeight: 200,
            maxWidth: 200,
            saveToPhotos: true,
          },
          (response) => {
            const apiData = new FormData();
            // apiData.append('fileOf', 'User');
            apiData.append('image', {
              uri: response.uri,
              type: response.type,
              name: response.fileName,
            });
            this.setState({isLoading: true});
            api
              .uploadImage(apiData)
              .then((res) => {
                this.setState({resourcePath: response.uri, isLoading: false});

                console.log(res);
              })
              .catch((error) => {
                this.setState({isLoading: false});
                console.log(error);
              });

            console.log(response.fileName);
          },
        );
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    const {isLoading, resourcePath, bgUrl} = this.state;
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          // barStyle={statusBarStyle}
          // showHideTransition={statusBarTransition}
        />
        <ImageBackground source={{uri: bgUrl}} style={Styles.container}>
          <View style={Styles.upperRow}>
            <Image
              style={Styles.upperArrow}
              source={imagePath.leftArrow
              }
            />
            <View style={Styles.logoView}>
              <TouchableOpacity onPress={this._profileImageFromGallery}>
                <Image
                  style={Styles.imgLogo}
                  source={{uri:resourcePath
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.loginTextView}>
            <Text style={Styles.loginText}>Sign Up</Text>
          </View>

          <View style={Styles.fieldView}>
            <TextInput
              placeholder="Name"
              placeholderTextColor="white"
              style={Styles.textInput}
              onChangeText={this.handleInputs('name')}
            />
            <View style={{position: 'relative'}}>
              <TextInput
                placeholderTextColor="white"
                placeholder="Birthday"
                style={Styles.textInput}
                value={this.state.dateOfBirth}
              />
              <TouchableOpacity
                onPress={this.showDateTimePicker}
                style={Styles.dateIcon2}>
                <Image
                  style={Styles.dateIcon}
                  source={{
                    uri:
                      'https://www.iconsdb.com/icons/preview/white/calendar-xxl.png',
                  }}
                />
              </TouchableOpacity>
            </View>
            <TextInput
              placeholderTextColor="white"
              placeholder="Email"
              style={Styles.textInput}
              onChangeText={this.handleInputs('email')}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="white"
              secureTextEntry={true}
              style={Styles.textInput}
              onChangeText={this.handleInputs('password')}
            />
            <TextInput
              placeholder="Re-Enter Password"
              placeholderTextColor="white"
              secureTextEntry={true}
              style={Styles.textInput}
              onChangeText={this.handleInputs('confirmPassword')}
            />
          </View>

          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          <View style={Styles.downSection}>
            <Text
              onPress={() => navigation.navigate(navigationStrings.LOGIN)}
              style={Styles.alreadyText}>
              Alredy Register? Login
            </Text>
          </View>

          <FlashMessage position="top" />
          <Loader isLoading={isLoading} />
        </ImageBackground>
        <View style={Styles.radiusView}>
          <TouchableOpacity style={Styles.loginBtn} onPress={this.onLogPress}>
            <Image
              style={Styles.loginLogo}
              source={imagePath.rightArrow}
            />
          </TouchableOpacity>
          <View style={Styles.iconView}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 20}}>
                --------------- OR ----------------
              </Text>
              <View style={Styles.socialIcons}>
                <TouchableOpacity style={Styles.iconFb}>
                  <Image
                    style={Styles.icon1}
                    source={{
                      uri:
                        'https://www.iconsdb.com/icons/preview/white/facebook-xl.png',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.iconFb}>
                  <Image
                    style={Styles.icon1}
                    source={{
                      uri:
                        'https://www.iconsdb.com/icons/preview/white/instagram-xxl.png',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.iconFb}>
                  <Image
                    style={Styles.icon1}
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
      </KeyboardAwareScrollView>
    );
  }
}

export default Signup;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'contain',
    // borderBottomEndRadius:20
    height: 700,
  },
  upperRow: {
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
    borderRadius:15
    
  },
  loginTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
  },
  loginText: {
    fontFamily: fontFamily.lobester,
    fontSize: 35,
    color: 'white',
  },
  fieldView: {
    marginTop: 30,
    height: 380,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    // backgroundColor:"red"
  },
  textInput: {
    borderWidth: 0.5,
    width: 380,
    backgroundColor: '#4DB8BA',

    borderRadius: 5,
    fontSize: 18,
    paddingLeft: 20,
    borderRadius: 20,
    color: 'white',
  },
  downSection: {
    height: 50,
    justifyContent: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginLogo: {
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
    marginTop: 50,
  },

  alreadyText: {
    color: 'white',
    fontFamily: fontFamily.lobester,
    marginTop: -40,
    fontSize: 20,
  },
  radiusView: {
    position: 'relative',
    backgroundColor: 'white',
    height: 150,
    borderTopEndRadius: 80,
    borderTopLeftRadius: 80,
    marginTop: -130,
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
    marginTop: 20,
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

  dateIcon: {
    height: 30,
    width: 30,
  },
  dateIcon2: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
