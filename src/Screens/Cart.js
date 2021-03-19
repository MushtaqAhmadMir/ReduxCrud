import React ,{Component}from 'react'
import {View,Text, FlatList, ScrollView,TouchableOpacity,Image,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import store from '../redux/store'
import types from '../redux/types'

const{dispatch}=store
 class Cart extends Component{

    

    deleteItem=(index)=>
    {
    //   dispatch({
    //       type:types.DELETE_ITEM,
    //       payload:index
    //   }) 
    }

     renderItem = ({ item,index }) => {
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
                <ScrollView
              style={{
                backgroundColor: "white",
                height: 210,
                marginTop: 10,
                position: "relative",
                borderBottomWidth:.5
              }}
            >
              <Text style={{ fontSize: 18,marginLeft:8 }}> {name} </Text>
              <Text style={{marginLeft:10,marginTop:7}}>8 GB RAM</Text>
              <View style={{marginTop:8,flexDirection:"row",justifyContent:"center",justifyContent:"space-between",width:100}}>
              <Text style={styles.star}>{star + " \u2606"}</Text>
              <Text style={{marginLeft:10}}>{number}</Text>
              <Image 
            style={{ height: 30, width: 70,marginTop:-6}}
            source={{
              uri:
                "https://o.remove.bg/downloads/fc284b9c-b16c-4e53-935a-467213fbb7b3/fakeperfume_inside2-removebg-preview.png",
            }}
          />
              </View>
              <View style={{flexDirection:"row"}}>
              <Text style={{ fontWeight: "bold", fontSize: 20,marginLeft:10 }}>
                {"\u20B9 " + reducedPrice}
              </Text>

              <Text
            style={{
              textDecorationLine: "line-through",
              marginTop: 5,
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
              marginTop: 5,
            }}
          >
            {discount + "% Off "}
          </Text>
              </View>
              <Text style={{color:"green",marginLeft:10,marginTop:8}}>4 offers applied . 3 offers available</Text>
              <Text style={{marginLeft:10,marginTop:8}}>Delivery on 3 - 4 days | <Text style={{color:"green"}}>Free</Text> {'\u20B9'}40</Text>
              <Image
                style={{
                  height: 110,
                  width: 100,
                   top:30,
                  marginLeft: 300,
                  position:"absolute"
                }}
                source={{ uri: image }}
              />
              <View style={{marginTop:7,borderWidth:.5,backgroundColor:"white",height:50,flexDirection:"row",justifyContent:"center",alignItems:"center",justifyContent:"space-around"}}>
              <Text>Save For Later  </Text>
              <Text> | </Text>
              <TouchableOpacity onPress={()=>this.deleteItem(index)}>
              <Text> Remove</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
        )
    }




    render()
    {
    //   console.log(this.props.listItems.number,"in cart")
        return(
            <View style={{flex:1,}}>
            <FlatList
      data={this.props.listItems}
      // numColumns={2}
      renderItem={this.renderItem}
      keyExtractor={(item) => item.id}
    />
            </View>
        )
    }
}
const mapStateToProps=state=>{

    return(
      {
        listItems:state.home.listItems
      }
    )
  }

  const styles=StyleSheet.create({
    star: {
      marginLeft: 10,
      // marginTop: 10,
      fontSize: 16,
      backgroundColor: "green",
      width: 45,
      height: 20,
      color: "white",
      borderRadius: 10,
      paddingLeft: 4,
    },
   })

export default connect(mapStateToProps)(Cart)