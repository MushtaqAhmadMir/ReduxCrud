import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import colors from '../../styles/colors';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import ButtonWithLoader from '../../Components/Button';
import navigationStrings from '../../constants/navigationStrings';

const {width, height} = Dimensions.get('screen');

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          image: imagePath.slide8,
          text: 'Shop Genuine Health Suppliments',
        },
        {
          image: imagePath.slide7,
          text: 'Get Customized Work Plans & Diet',
        },
        {
          image: imagePath.slide6,
          text: 'Consult with Best Nutritionists',
        },
        {},
      ],
    };
  }

  get pagination() {
    const {carouselItems, activeIndex} = this.state;
    if (activeIndex != 3) {
      return (
        <Pagination
          dotsLength={carouselItems.length}
          activeDotIndex={activeIndex}
          //   containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: 'white',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      );
    } else {
      <></>;
    }
  }

  _renderItem({item, index}) {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 10,
          //   backgroundColor:'red',
          borderRadius: 5,
          height: 500,
          width: '100%',
          //   marginLeft: 25,
          //   marginRight: 25,
        }}>
        <Image
          style={{resizeMode: 'cover', height: 200, width: '100%'}}
          source={item.image}
        />
        <View
          style={{
            //   backgroundColor:"red",
            justifyContent: 'center',
            alignItems: 'center',
            //   paddingLeft:60,

            height: 150,
          }}>
          <Text
            style={{
              color: colors.white,
              fontSize: 35,
              marginTop: 20,
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    const {activeIndex} = this.state;
    if (activeIndex != 3) {
      return (
        <View style={{backgroundColor: colors.themeColor, flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View>
              <Carousel
                layout={'default'}
                ref={(ref) => (this.carousel = ref)}
                data={this.state.carouselItems}
                sliderWidth={width}
                itemWidth={400}
                renderItem={this._renderItem}
                onSnapToItem={(index) => this.setState({activeIndex: index})}
              />
              <View>{this.pagination}</View>
            </View>
          </View>
          <ButtonWithLoader
            btnText={'GET STARTED'}
            btnStyle={styles.btnStyle}
            color={colors.themeColor}
            onPress={() =>
              this.props.navigation.navigate(navigationStrings.SIGNUP)
            }
          />
        </View>
      );
    } else {
      return (
        <View style={{backgroundColor: colors.themeColor, flex: 1}}>
          <ImageBackground
            style={{
              width: '100%',
              height: '95%',
              resizeMode: 'contain',
              position: 'relative',
            }}
            source={imagePath.imgBg}>
            <View
              style={{
                // backgroundColor: 'red',
                height: 200,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"row",
                justifyContent:"space-around",
              }}>
              <ButtonWithLoader
                btnText={'LOGIN'}
                btnStyle={styles.btnStyle2}
                color={colors.themeColor}
                onPress={() =>
                  this.props.navigation.navigate(navigationStrings.LOGIN)
                }
              />
              <ButtonWithLoader
                btnText={'SIGNUP'}
                btnStyle={styles.btnStyle2}
                color={colors.themeColor}
                onPress={() =>
                  this.props.navigation.navigate(navigationStrings.SIGNUP)
                }
              />
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  btnStyle: {
    // borderWidth:.5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 300,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnStyle2: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 160,
    height: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
