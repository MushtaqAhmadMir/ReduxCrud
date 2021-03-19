import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import FlatList from "../../Components/HomeStyle";
import navigationStrings from "../../constants/navigationStrings";
import store from '../../redux/store'
import types from "../../redux/types";

const {dispatch}=store
export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      price:0,
      cartArray: [],
      itemList: [
        {
          id: 1,
          name: "Realme C11 (Rich Grey, 32GB)",
          image:
            "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
          originalPrice: 12999,
          reducedPrice: 9999,
          discount: 68,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1400,
        },
        {
          id: 2,
          name: "POCO C3 (Arctic Blue,32 GB)",
          originalPrice: 19999,
          image:
          "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
          reducedPrice: 12318,
          discount: 34,
          star: 3.9,
          emi: "No Cost EMI",
          exchange: 1200,
          number: 12345,
        },
        {
          id: 3,
          name: "POCO M3 (Cool Blue, 64 GB)",
          image:
          "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
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
          name: "Redmi 9i(Midnight Black, 64 GB)",
          image:
          "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
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
          name: "Motorola E7 Power(Blue,64 GB)",
          image:
          "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
          originalPrice: 14999,
          reducedPrice: 12318,
          discount: 28,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1200,
        },
        {
          id: 6,
          name: "IPHONE 12 max Pro(Gold 128 GB)",
          image:
          "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
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
          name: "Realme Narzo 20(Gloey Silver,64 GB)",
          image:
          "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
          originalPrice: 12999,
          reducedPrice: 10318,
          discount: 20,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1200,
        },
        {
          id: 8,
          name: "Realme X7(Space Sliver, 128 GB)",
          image:
          "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
          originalPrice: 17999,
          reducedPrice: 13318,
          discount: 48,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
          exchange: 1200,
        },
        {
          id: 9,
          name: "Apple iPhone 11(White, 64 GB)",
          image:
          "https://zindadeal.com/wp-content/uploads/2020/08/Realme-c11-grey.jpg",
          originalPrice: 118999,
          reducedPrice: 15318,
          discount: 68,
          star: 3.9,
          number: 65067,
          emi: "No Cost EMI",
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
    dispatch({
      type:types.HOMEPAGE,
      payload:item
    })

    const { counter,cartArray,itemList ,price} = this.state;
    let bool = true


   for( let i=0;i<cartArray.length;i++) 
    if(cartArray[i].id == item.id){
      alert("already added")
      bool = false
    }
if (bool) {
 
  console.log(item,"item........")
  
  let newCartArray = [...cartArray, item]
  this.setState({counter: counter+1, cartArray: newCartArray,})
}      
  };
  render() {
    const { itemList, counter, cartArray,price } = this.state;
    // const { onItemSelected, selectedItem } = this;
    return (
      <View
        style={{
          backgroundColor: "white",
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
                style={{ height: 60, width: 60 }}
                source={{
                  uri:
                    "https://icon-library.com/images/white-menu-icon/white-menu-icon-12.jpg",
                }}
              />
              <Image
                style={{ height: 50, width: 90, marginLeft: 15, marginTop: 5 }}
                source={{
                  uri:
                    "https://couponcode-images.s3-ap-southeast-1.amazonaws.com/public/shop/240.jpg",
                }}
              />
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
                  source={{
                    uri:
                      "https://www.iconsdb.com/icons/preview/white/cart-8-xxl.png",
                  }}
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
              style={{
                height: 25,
                width: 25,
                marginRight: 15,
                position: "absolute",
                left: 10,
              }}
              source={{
                uri:
                  "https://images.vexels.com/media/users/3/132068/isolated/preview/f9bb81e576c1a361c61a8c08945b2c48-search-icon-by-vexels.png",
              }}
            />
            <Image
              style={{
                height: 27,
                width: 26,
                marginRight: 15,
                position: "absolute",
                right: 10,
              }}
              source={{
                uri:
                  "https://www.materialui.co/materialIcons/hardware/keyboard_voice_grey_192x192.png",
              }}
            />
          </View>
        </View>
        <View style={{ marginBottom: 50 }}>
          <FlatList
            // cartArray={cartArray}
            itemList={itemList}
           
            navigationProp={this.props.navigation}
            // counter={counter}
            setCounter={this.setCounter}
          />
        </View>
        <View
          style={{
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
          }}
        >
          <Text style={{ color: "white" }}>{counter}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  navbar: {
    backgroundColor: "#2874f0",
    height: 120,
  },
  searchBar: {
    backgroundColor: "white",
    height: 35,
    justifyContent: "center",
    position: "relative",
    marginLeft: 8,
    marginRight: 8,
  },
});
