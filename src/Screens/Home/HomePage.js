import axios from 'axios';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import fontFamily from '../../styles/fontFamily';
import {clearUserData} from '../../utils/utils';
import store from '../../redux/store'
import { connect } from 'react-redux';


 class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      offset: 4,
      isloading: false,
    };
  }
  componentDidMount() {
    this.apicall();
  }

  apicall() {
    const {isLoading} = this.state;
    if (!isLoading) {
      console.log('getData');
      this.setState({
        isLoading: true,
      });
    }
    axios
      .request(
        `https://api.thecatapi.com/v1/images/search?limit=${this.state.offset}&page=1`,
      )

      .then((resJson) => {
        this.setState({data: resJson.data});
        console.log(resJson.data);
        
      })
      .catch((e) => console.log(e));
  }
  renderItemComponent = (data) => (
    <View style={Styles.container}>
      <View style={{borderWidth: 0.5, margin: 10, borderRadius: 20}}>
        <Image style={Styles.img} source={{uri: data.item.url}} />
        <Text style={Styles.text}>The Cute One </Text>
      </View>
    </View>
  );
  valueIncrement = () => {
    const {offset} = this.state;

    this.setState(
      {
        offset: offset + 2,
      },
      () => {
        this.apicall();
      },
    );
  };
  renderFooter = () => {
    const {isLoading} = this.state;
    return (
      // Footer View with Loader
      <View style={Styles.footer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color="red" style={{margin: 30}} />
        ) : null}
      </View>
    );
  };

  onLogout = () => {
    clearUserData()
      .then((res) => {
        alert('Success');
        console.log(res, 'res');
        this.props.navigation.navigate(navigationStrings.LOGIN);
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };

  render() {
    const {itemList}=this.props;
    console.log(itemList,"inhomePage")
    const {navigation} = this.props;
    return (
      <View>
        <View style={Styles.header}>
          <Text style={{fontFamily: fontFamily.lobester, fontSize: 30}}>
            The Cat Market
          </Text>
          <Image
            style={{height: 40, width: 50}}
            source={{
              uri:
                'https://o.remove.bg/downloads/f85f4e78-3116-45da-9526-282dbbf974b4/6725-200-removebg-preview.png',
            }}
          />
          <TouchableOpacity onPress={this.onLogout}>
            <Image style={{height: 25, width: 25}} source={imagePath.logout} />
          </TouchableOpacity>
        </View>

        <FlatList
          numColumns={2}
          data={this.state.data}
          renderItem={(item) => this.renderItemComponent(item)}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={this.valueIncrement}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}
const mapStateToProps=state=>{

  return(
    {
      itemList:state.home.itemList
    }
  )
}

export default connect(mapStateToProps)(HomePage)

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 200,
    backgroundColor: 'red',
    flex: 1,
  },
  footer: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
    margin: 10,
  },
  img: {
    height: 180,
    width: 180,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: fontFamily.lobester,
    alignSelf: 'center',
    color: 'black',
    fontSize: 20,
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'space-around',
  },
});
