import axios from 'axios';
import React from 'react';
import {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../../Components/Header';
// import Loader from '../../Components/Loader'
import {GET_USERS} from '../../config/urls';
import actions from '../../redux/actions';
import fontFamily from '../../styles/fontFamily';

import {apiPost, getHeaders} from '../../utils/utils';

class Consult extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      isLoading: false,
      offset: 6,
      skip: 0,
    };
  }

  componentDidMount() {
    console.log(GET_USERS, 'url api');
    this.infiniteApi();
  }
  infiniteApi = () => {
    // let skip=0
    const {isLoading} = this.state;
    if (!isLoading) {
      this.setState({isLoading: true});
    }

    apiPost(GET_USERS, {
      searchType: 'LEADERBOARD',
      limit: `${this.state.offset}`,
      skip: `${this.state.skip}`,
    })
      .then((res) => {
        this.setState({data: res.data});
        console.log(res);
        this.setState({isLoading: false});
      })
      .catch((err) => {
        this.setState({isLoading: false});
        console.log(err);
        //    alert(error)
      });
  };

  valueIncrement = () => {
    console.log(this.state.data.length, 'in items');
    const {offset, skip} = this.state;
    this.setState(
      {
        // skip:this.state.data.length,
        offset: offset + 2,
      },
      () => {
        this.infiniteApi();
        // console.log(skip,"skip")
      },
    );
  };
  renderFooter = () => {
    const {isLoading} = this.state;
    return (
      // Footer View with Loader
      <View style={Styles.footer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color="red" style={{margin: 20}} />
        ) : null}
      </View>
    );
  };

  renderItemComponent = (item) => {
    const {profileImg} = item.item;
    //  const {image}=profileImg[0].original
    //  console.log(image,"image")
    const {fullName, lookingFor} = item.item;
    return (
      <View style={Styles.container}>
        <View style={style.cardView}>
          <Image
            style={Styles.img}
            source={{uri: item.item.profileImg[0].original}}
          />

          <Text style={Styles.text}>{fullName} </Text>
          <Text style={Styles.text2}>Looking for {lookingFor} </Text>
        </View>
      </View>
    );
  };

  render() {
    const {isLoading} = this.state;
    console.log(this.state.data, 'asdfghjkl');
    return (
      <View>
        <Header />
        <View>
          <FlatList
            numColumns={2}
            data={this.state.data}
            renderItem={(item) => this.renderItemComponent(item)}
            //   keyExtractor={(item) => item.id.toString()}
            onEndReached={this.valueIncrement}
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
  };
};
const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 250,
    flex: 1,
    margin: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    height: 240,
    width: 180,
    borderRadius: 5,
    position: 'relative',
    resizeMode: 'cover',
  },
  text: {
    //   fontFamily: fontFamily.lobester,
    //   alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    position: 'absolute',
    bottom: 40,
    left: 10,
    fontWeight: 'bold',
  },
  text2: {
    //   fontFamily: fontFamily.lobester,
    //   alignSelf: 'center',
    color: 'white',
    fontSize: 17,
    position: 'absolute',
    bottom: 15,
    left: 10,
    //   fontWeight:"bold"
  },
  cardView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default connect(mapStateToProps)(Consult);
