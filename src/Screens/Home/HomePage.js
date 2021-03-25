import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import FlatList from "../../Components/HomeStyle";
import imagePath from "../../constants/imagePath";
import navigationStrings from "../../constants/navigationStrings";
import store from '../../redux/store'
import types from "../../redux/types";
import MyCarousel from '../../Components/SnapCarousel'
import actions from "../../redux/actions";
import { connect } from "react-redux";
import { showMessage } from "react-native-flash-message";
import colors from "../../styles/colors";

const {height,width} = Dimensions.get("screen")

const {dispatch}=store
 class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      price:0,
      cartArray: [],
      itemList: [
        {
          id: 1,
          name: "MusleBlaze Whey Protein, 8.8 lb",
          image:imagePath.item1,
          qnt:1, 
          originalPrice: 12999,
          reducedPrice: 9999,
          discount: 68,
          star: 3.9,
          number: 65067,
         
        },
        {
          id: 2,
          name: "High Protien Serial",
          originalPrice: 19999,
          qnt:1, 
          image:imagePath.item2,
          reducedPrice: 12318,
          discount: 34,
          star: 3.9,
          emi: "No Cost EMI",
          exchange: 1200,
          number: 12345,
        },
        {
          id: 3,
          name: "MASS GAINER IMPROVED",
          image:imagePath.item3,
          qnt:1, 
          originalPrice: 20999,
          reducedPrice: 13318,
          discount: 28,
          star: 4.5,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 2200,
        },
        {
          id: 4,
          name: "SLIM SHAKE",
          image:imagePath.item4,
          qnt:1, 
          originalPrice: 12999,
          reducedPrice: 11318,
          discount: 18.9,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1200,
        },
        {
          id: 5,
          name: "100% WHEY PROTIEN",
          image:imagePath.item5,
          originalPrice: 14999,
          qnt:1, 
          reducedPrice: 12318,
          discount: 28,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1200,
        },
        {
          id: 6,
          name: "PROTIEN SLIM NATURAL",
          image:imagePath.item6,
          qnt:1, 
          originalPrice: 123999,
          reducedPrice: 110318,
          discount: 20,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1200,
        },
        {
          id: 7,
          name: "SLIM SHAKE CHOCOLATE",
          image:imagePath.item7,
          originalPrice: 12999,
          qnt:1, 
          reducedPrice: 10318,
          discount: 20,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1200,
        },
        {
          id: 8,
          name: "TRIPLE GINSENG",
          image:imagePath.item8,
          originalPrice: 17999,
          qnt:1, 
          reducedPrice: 13318,
          discount: 48,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1200,
        },
        
      ],
    };
  }


  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      if (this.props.route.params) {
        let newItemAdded = this.props.route.params.item;
        this.props.route.params = null;
        console.log(newItemAdded.item)
        this.setCounter(newItemAdded.item);
       
      } else {
        console.log("props not given");
      }
    });
  }

  componentWillUnmount() {
    if(this._unsubscribe)
    {
     this._unsubscribe();
    }
  }


  setCounter = (item) => {
    //item >> array >>
    

    const { counter,cartArray,itemList ,price} = this.state;
    let bool = true


   for( let i=0;i<cartArray.length;i++) 
    if(cartArray[i].id == item.id){
     showMessage({
       message:"Already Added",
       type:"warning"
     })
      bool = false
    }
if (bool) {
  actions.addData(item)
 actions.totalPrice(item.id)
  console.log(item,"item........")
  
  let newCartArray = [...cartArray, item]
  this.setState({ cartArray: newCartArray,})
}      
  };
  render() {
  //  console.log(this.props.listItems.length,"in homepage")
    const { itemList, counter, cartArray,price } = this.state;
    // const { onItemSelected, selectedItem } = this;
    return (
      <View
        style={{
          backgroundColor: colors.white,
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <View style={styles.navbar}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", margin: 10 }}>
              <Image
                style={{ height: 60, width: 60 ,tintColor:colors.themeColor}}
                source={{
                  uri:
                    "https://icon-library.com/images/white-menu-icon/white-menu-icon-12.jpg",
                }}
              />
              <Text style={{color:colors.themeColor,fontSize:25,marginTop:12}}>HEALT<Text style={{backgroundColor:colors.themeColor,color:colors.white}}>HK</Text>ART</Text>
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
                //{newItem:cartArray, price:price }
                onPress={()=>this.props.navigation.navigate(navigationStrings.CART)}
              >
                <Image
                  style={{ height: 27, width: 27 }}
                  source={imagePath.cart}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.searchBar}>
            <TextInput
              style={{ marginLeft: 50, fontSize: 17 }}
              placeholder="Search for Products, Brands and More"
            />

            <Image
              style={styles.searchIcon}
              source={{
                uri:
                  "https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-search-icon-by-vexels.png",
              }}
            />
            <Image
              style={styles.voiceIcon}
              source={{
                uri:
                  "https://www.materialui.co/materialIcons/hardware/keyboard_voice_grey_192x192.png",
              }}
            />
          </View>

        </View>
        {/*  */}
        <View
          style={ styles.counter
           
          }
        >
          <Text style={{ color: "white" }}>{this.props.listItems.length}</Text>
        </View>
        <ScrollView>
        <View style={{height:height/2.8}}>
        <MyCarousel />
        </View>
        <View style={{ paddingBottom: 120}}>

           <FlatList
            // cartArray={cartArray}
            itemList={itemList}
          
            navigationProp={this.props.navigation}
             counter={this.props.listItems.length}
            setCounter={this.setCounter}
          /> 
         </View>
         </ScrollView>
      </View>
     
    );
  }
}
const mapStateToProps=state=>
{
  return(
    {
      listItems:state.home.listItems
    }
  )
}
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "white",
    height: 120,
  },
  searchBar: {
    backgroundColor: "white",
    height: 40,
    justifyContent: "center",
    position: "relative",
    marginLeft: 8,
    marginRight: 8,
    borderWidth:1,borderColor:"lightgrey",
    borderRadius:10
  },
  counter:{
    position: "absolute",
    backgroundColor: "red",
    right: 15,
    top: 12,
    borderWidth: 0.5,
    borderRadius: 20,
    width: 15,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
  },
  voiceIcon:{
    height: 27,
    width: 26,
    marginRight: 15,
    position: "absolute",
    right: 10,
  },
  searchIcon:{
    height: 25,
    width: 25,
    marginRight: 15,
    position: "absolute",
    left: 10,
  }
});
 export default connect(mapStateToProps)(HomePage)