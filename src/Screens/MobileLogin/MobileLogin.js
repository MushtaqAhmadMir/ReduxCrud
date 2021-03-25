import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from 'react-native';
import AuthHeader from '../../Components/AuthHeader';
import ButtonWithLoader from '../../Components/Button';

// import Header from '../../Components/Header';
import api from '../../redux/actions';
// import CodeInput from 'react-native-confirmation-code-input'
import StatusBar from '../../Components/StatusBar';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import Validation from '../../utils/validation';
import { showMessage } from 'react-native-flash-message';
import Loader from '../../Components/Loader';
import actions from '../../redux/actions';
import navigationStrings from '../../constants/navigationStrings';
import {otpTimerCounter} from '../../utils/helperFunctions'

export default class MobileLogin extends Component {
  constructor() {
    super();
    this.state = {
        isVisible:false,
      phoneNo: '',
      otp:'',
      isLoading:false,
      userId:'',
      timer:100
    };
  }

  onLogPress = () => {
      
      
    this.handleInputs;
    if (this.isValidData())
    {
        this.apiCall();
    }
    // console.log(this.state.phoneNo, 'in mobile screen');
    
  };

  isValidData = () => {
    const {phoneNo} = this.state;
    // alert()
    const error = Validation({phoneNumber:phoneNo});
    if (error) {
      showMessage({
        message: error,
        type: 'danger',
        icon: 'danger',
      });
      return false;
    }else{
        
          return true;
        //   this.setState({isLoading: true});
       
    }
    
     };
  

  apiCall = () => {
   this.setState({isLoading:true})
    const {phoneNo} = this.state;
    // if (this.isValidData()) {
    //   // alert('Valid Data');
    //   console.log({
    //     name: email,
    //     password: password,
    //   });
    api
      .mobileVerify({
        contactDetails: {
          phoneNo: phoneNo,
          countryCode: '+91',
          countryCodeISO: 'IN',
        },
      })
      .then((res) => {
          
           this.setState({isVisible: true,isLoading:false});
        console.log(res.data.userId, 'in mobile loign response');
        this.setState({userId:res.data.userId})
        //   this.props.navigation.navigate(navigationStrings.HOME_PAGE);
      })
      .catch((error) => {
           this.setState({isLoading: false});
        console.log(error);
      });
    // }
  };

  handleInputs = (key) => {
    return (value) => {
      this.setState({[key]: value});
    };
  };


  verifyOtp=()=>
  {
      this.setState({isLoading:true})
      const{userId,otp}=this.state
      console.log(otp,"in verify")
      api.verifyOtp({
          userId,
          otp,
          deviceToken: '123',
          registerFrom:Platform.OS.toUpperCase()
      }).then((res)=>{
          console.log(res,"otp verify in  data")
          this.setState({isLoading:false})
          showMessage({
              message:"successfully Verify",
              type:'success',
              icon:'success'
          })
          this.props.navigation.navigate(navigationStrings.TAB_ROUTES)
      }).catch((error) => {
          this.setState({isLoading: false});
        console.log(error);
      });
    
      this.setState({isVisible:false})
  }
  _onResend = () => {
    this.setState({timer:120})
  };

  render() {

    const{isVisible,isLoading,timer}=this.state
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <View style={{height: 70}}>
          <AuthHeader text={'MOBILE LOGIN'} />
        </View>
        <View style={{height: 150, margin: 10, justifyContent: 'space-around'}}>
          <TextInput
            placeholderTextColor={colors.themeColor}
            keyboardType="number-pad"
            placeholder="Mobile"
            style={styles.textInput}
            onChangeText={this.handleInputs('phoneNo')}
          />
          <View style={{marginTop: 20}}>
            <ButtonWithLoader
              btnText={'GET OTP'}
              color={colors.white}
              btnStyle={styles.btnStyle}
              onPress={this.onLogPress}
            />
          </View>
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
              <Image style={styles.textGoogle} source={imagePath.googleImage} />
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
        <Loader isLoading={isLoading}/>
        <Modal visible={isVisible} transparent>
          <View
            style={{
              height: 500,
              backgroundColor: colors.lightGreyBg,
              margin: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0,
              shadowRadius: 4.65,

              elevation: 8,
            }}>
            <View style={{height:60}}>
      <AuthHeader
          text={"VERIFY OTP"}
      />
      </View>
      <View style={{height: 150, margin: 10, justifyContent: 'space-around'}}>
          <TextInput
            placeholderTextColor={colors.themeColor}
            keyboardType="number-pad"
            placeholder="Enter OTP"
            style={styles.textInput}
            onChangeText={this.handleInputs('otp')}
          />
           <ButtonWithLoader
              btnText={'VERIFY OTP'}
              color={colors.white}
              btnStyle={styles.btnStyle2}
               onPress={this.verifyOtp}
            />
          </View>
          {/* <Text style={{color:colors.themeColor,alignSelf:"flex-end",padding:10,fontSize:20}}>Resend Code</Text> */}
          {timer > 0 ? (
          <View style={{height:200}}>
            <Text style={{ color: colors.textGreyLight,alignSelf:"flex-end",margin:15}}>
                Resend Code In 
               <Text
                style={{
                  color: colors.themeColor,
                //   fontFamily: fontFamily.futuraBtHeavy,
                }}>
                {` ${otpTimerCounter( timer )} min`}
              </Text>
            </Text>
          </View>
        ) : (
          <View style={{height:100}}>
            <Text style={{ color: colors.textGreyLight}}>
              DID'NT GET OTP
              <Text
                onPress={this._onResend}
                style={{
                  color: colors.themeColor,
                //   fontFamily: fontFamily.futuraBtHeavy,
                }}>
                {' '}
                RESEDN CODE
              </Text>
            </Text>
          </View>
        )}
            </View>
           
        </Modal>
      </View>
    );
  }
}
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
  btnStyle: {
    backgroundColor: colors.themeColor,
    width: 400,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnStyle2: {
    backgroundColor: colors.themeColor,
    width: 300,
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
  bottomContainer: {
    // flex: 1,
    // justifyContent: 'flex-end',
    marginBottom: 30,
  },
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
