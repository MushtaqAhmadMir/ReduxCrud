import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from "react-native";


export default function HomeStyle(props) {
  const {
    itemList,
    
    setCounter,
    cartArray,
  } = props;
  
  let renderItem = ({ item }) => {
    const {
      name,
      image,
      star,
      emi,
      number,
      originalPrice,
      reducedPrice,
      discount,
      exchange,
    } = item;

    return (
      <TouchableOpacity
        // onPress={() =>
        //   props.navigationProp.navigate(navigationStrings.DETAIL_PAGE, {
        //     item: {item}
        //   })
        // }
      >
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            position: "relative",
          }}
        >
          <View>
            <Image
              style={{ height: 110, width: 80, margin: 10 }}
              source={{ uri: image }}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                justifyContent: "space-around",
              }}
            >
              <Text style={{ fontSize: 18, marginTop: 10 }}>{name}</Text>
              {/* <Image style={{height:30,width:30}} source={{uri:"https://o.remove.bg/downloads/8c739d93-1943-4ff2-ae7c-420068393478/129-1293437_heart-icon-grey-png-removebg-preview.png"}}/> */}
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 16,
                  backgroundColor: "green",
                  width: 40,
                  height: 20,
                  color: "white",
                  paddingLeft: 5,
                }}
              >
                {star + " \u2606"}
              </Text>
              <Text style={{ marginLeft: 10 }}>{"(" + number + ")"}</Text>
              <Image
                style={{ height: 30, width: 70, marginTop: -6 }}
                source={{
                  uri:
                    "https://o.remove.bg/downloads/fc284b9c-b16c-4e53-935a-467213fbb7b3/fakeperfume_inside2-removebg-preview.png",
                }}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
              >
                {"\u20B9 " + reducedPrice}
              </Text>
              <Text
                style={{
                  textDecorationLine: "line-through",
                  marginTop: 2,
                  marginLeft: 7,
                  fontSize: 16,
                }}
              >
                {"\u20B9" + originalPrice}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "green",
                  marginLeft: 10,
                  marginTop: 2,
                }}
              >
                {discount + "% Off "}
              </Text>
            </View>
            <View style={{ flexDirection: "row", position: "relative" }}>
              <View>
                <Text>{emi}</Text>
                <Text>Upto {"\u20B9 " + exchange} Off on Exchange</Text>
              </View>
              <TouchableOpacity  onPress={()=>{setCounter(item)}}  style={{backgroundColor:"#fb641b",height:30,width:100,position:"absolute",left:200,justifyContent:"center",alignItems:"center"}}>
            <Text style={{color:"white",fontSize:18,}}>Add To Cart</Text>
            </TouchableOpacity>
            </View>
          </View>
          {/* <TouchableOpacity
            onPress={()=>{setCounter(item)}}

            style={
              styles.counterFnc
              
            }
          >
            <Image
              style={{ height: 20, width: 20 }}
              source={{
                uri:
                  "https://o.remove.bg/downloads/8c739d93-1943-4ff2-ae7c-420068393478/129-1293437_heart-icon-grey-png-removebg-preview.png",
              }}
            />
          </TouchableOpacity> */}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={itemList}
      // numColumns={2}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
 
const styles=StyleSheet.create({
  counterFnc:
  {
    height: 30,
              width: 30,
              backgroundColor: "white",
              position: "absolute",
              right: 20,
              top: 10,
              borderRadius: 20,
              borderColor: "gray",
              borderWidth: 0.5,
              alignItems: "center",
              justifyContent: "center",
  }
})