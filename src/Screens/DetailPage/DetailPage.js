import React, {Component} from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {Cart} from '..';
import Header from '../../Components/Header';
import StatusBar from '../../Components/StatusBar';
import navigationStrings from '../../constants/navigationStrings';
import colors from '../../styles/colors';

class DetailPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let item = this.props.route.params.item;
    console.log(item, 'fghjkldfghjkl');
    const {
      name,
      price,
      image,
      id,
      originalPrice,
      reducedPrice,
      discount,
      star,
      emi,
      number,
    } = item;
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <StatusBar />
          <Header navigation={this.props.navigation} />
          <View
            style={{
              height: 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={item.image} style={{height: 200, width: 150}} />
          </View>
          <Text style={{fontSize: 20, marginLeft: 10}}>{name}</Text>
          <Text
            style={{
              backgroundColor: '#aaf2c4',
              color: 'green',
              width: 100,
              margin: 10,
            }}>
            Extra {'\u20B9'}4000 off
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              {'\u20B9 ' + reducedPrice}
            </Text>
            <Text
              style={{
                textDecorationLine: 'line-through',
                marginTop: 5,
                marginLeft: 7,
                fontSize: 16,
              }}>
              {'\u20B9' + originalPrice}
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: 'green',
                marginLeft: 10,
                marginTop: 5,
              }}>
              {discount + '% Off '}
            </Text>
          </View>
          <View style={{flexDirection: 'row', margin: 10}}>
            <Text>FREE DELIVERY</Text>
          </View>
          <Text style={{marginLeft: 10}}>
            EMI from {'\u20B9' + '342/month.'}
            <Text style={{color: 'blue'}}>View Plans</Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.5,
              paddingBottom: 10,
            }}>
            <Text style={styles.star}>{star + ' \u2606'}</Text>
            <Text style={{color: 'blue', marginLeft: 10, marginTop: 10}}>
              {number + ' Ratings >'}
            </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Home', {item: {item}})
              }
              style={styles.buyNow}>
              <Text style={{color: 'white', fontSize: 18}}>BUY NOW</Text>
            </TouchableOpacity>
          </View>
          <Text style={{fontWeight: 'bold', margin: 10}}>
            {' '}
            Available offers
          </Text>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 40, height: 40}}
                source={{
                  uri:
                    'https://o.remove.bg/downloads/212de43e-a572-4206-9b53-537d094ee841/tag_green-512-removebg-preview.png',
                }}
              />
              <Text style={{marginTop: 10}}>
                GST Invoice is available for this Product
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{width: 40, height: 40}}
                source={{
                  uri:
                    'https://o.remove.bg/downloads/212de43e-a572-4206-9b53-537d094ee841/tag_green-512-removebg-preview.png',
                }}
              />
              <Text style={{marginTop: 10}}>
                5% Unlimited Cashback on Flipkart Axis Bank Credit Card
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                paddingBottom: 20,
              }}>
              <Image
                style={{width: 40, height: 40}}
                source={{
                  uri:
                    'https://o.remove.bg/downloads/212de43e-a572-4206-9b53-537d094ee841/tag_green-512-removebg-preview.png',
                }}
              />
              <Text style={{marginTop: 10, paddingRight: 10}}>
                10% Off on Bank of Barod MasterCard debit card first time
                transaction,Terms and Conditions apply
              </Text>
            </View>
            <Text style={{marginLeft: 10}}>Select Flavour</Text>
            <View style={styles.mobilecolor}>
              <View style={styles.mobilecolor1}>
                <Image style={{height: 100, width: 80}} source={image} />
                <Text>Chocholate</Text>
              </View>
              <View style={styles.mobilecolor2}>
                <Image style={styles.itemImg} source={image} />
                <Text>Mint</Text>
              </View>
            </View>

            <Text style={{marginTop: 20, marginLeft: 10, fontWeight: 'bold'}}>
              Cancellation & Return Policy
            </Text>
            <View style={{marginTop: 10, marginLeft: 20}}>
              <Text style={{marginTop: 5}}>
                . No Cancellation fee on this product
              </Text>
              <Text style={{marginTop: 5}}>. 7 Days Repalcement Policy</Text>
              <Text style={{marginTop: 5, color: 'blue', marginLeft: 10}}>
                View details
              </Text>
            </View>
            <Text style={{marginTop: 20, marginLeft: 10, fontWeight: 'bold'}}>
              Reviews & Ratings
            </Text>
            <View style={styles.review}>
              <View style={styles.leftReview}>
                <Text style={{fontWeight: 'bold', fontSize: 25, marginTop: 10}}>
                  {star + '\u2606'}
                </Text>
                <Text style={{color: 'gray', padding: 5, marginLeft: 10}}>
                  {' '}
                  1,677 ratings and 101 reviews
                </Text>
              </View>
              <Text style={{fontSize: 100, color: 'gray'}}>|</Text>
              <View style={styles.rightReview}>
                <Image
                  style={{height: 50, width: 100}}
                  source={{
                    uri:
                      'https://static.thenounproject.com/png/2155118-200.png',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default DetailPage;

const styles = StyleSheet.create({
  itemImg: {
    height: 100,
    width: 80,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  star: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: 'green',
    width: 45,
    height: 20,
    color: 'white',
    borderRadius: 10,
    paddingLeft: 4,
  },
  mobilecolor1: {
    borderWidth: 0.5,
    height: 120,
    width: 100,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  review: {
    marginTop: 20,
    height: 120,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftReview: {
    marginLeft: 10,
    height: 100,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightReview: {
    marginLeft: 2,
    height: 100,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyNow: {
    backgroundColor: colors.themeColor,
    borderRadius: 5,
    width: 90,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 170,
  },
  mobilecolor2: {
    borderWidth: 0.5,
    height: 120,
    width: 100,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobilecolor: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    marginTop: 20,
  },
  
});
