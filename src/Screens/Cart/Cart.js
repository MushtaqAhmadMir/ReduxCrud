import React ,{Component}from 'react'
import {View,Text, FlatList, ScrollView,TouchableOpacity,Image,StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import Header from '../../Components/Header'
import store from '../../redux/store'
import types from '../../redux/types'
import colors from '../../styles/colors'
import StatusBar from '../../Components/StatusBar'
import actions from '../../redux/actions'


const{dispatch}=store
 class Cart extends Component{
  
  valueIncrement=(id)=>
  {
    
    actions.changeValue(id)
  }

  valueDecrement=(id)=>
  {
     actions.decrementValue(id)
  }
  deleteItem=(id)=>
  {
    actions.deleteItem(id)
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
          qnt
        } = item;
    
        return (
          
                <ScrollView
              style={styles.scrollView}
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
             
              <View style={{height:20,flexDirection:"row",margin:10,borderWidth:.5,width:100,margin:10}}>
                <Text style={{marginLeft:10,borderRightWidth:.5}}>Qnt </Text>
                <TouchableOpacity onPress={()=>this.valueDecrement(item.id)} ><Text style={{fontWeight:"bold"}}>   -  </Text></TouchableOpacity>
                 <Text>{qnt}</Text>
                <TouchableOpacity onPress={()=>this.valueIncrement(item.id)}><Text style={{fontWeight:"bold"}}>   +  </Text></TouchableOpacity>
              </View>
              <Image
                style={{
                  height: 120,
                  width: 100,
                   top:30,
                  marginLeft: 300,
                  position:"absolute"
                }}
                source={item.image }
              />
              <View style={{marginTop:7,borderWidth:.5,backgroundColor:"white",height:50,flexDirection:"row",justifyContent:"center",alignItems:"center",justifyContent:"space-around"}}>
              <Text>Save For Later  </Text>
              <Text> | </Text>
              <TouchableOpacity onPress={()=>this.deleteItem(item.id)}>
              <Text> Remove</Text>
              </TouchableOpacity>
            </View>
            </ScrollView>
            
        )
    }




    render()
    {


console.log(this.props.price,"price in cart")
      const {navigation}=this.props
      //  console.log(this.props.navigation,"in cart..........")
        return(
            <View style={{flex:1,}}>
            <StatusBar />
            <View style={{height:80}}>
            <Header navigation={navigation} />
            </View>
            <FlatList
      data={this.props.listItems}
      // numColumns={2}
      renderItem={this.renderItem}
       keyExtractor={(item) => item.id}
    />
     <View style={{height:60,backgroundColor:"white",borderWidth:.5,borderTopWidth:0,borderTopWidth:.2,borderTopColor:"whitegrey",justifyContent:"center",alignItems:"center",justifyContent:"space-between",flexDirection:"row",padding:10}}>
        <Text style={{fontWeight:"bold",fontSize:20}}>Total Balance {'\u20B9 '+this.props.price}</Text>
        <TouchableOpacity
        // onPress={() => {
        //      this.props.navigation.navigate(navigationStrings.ORDER_DETAILS,{item:items});
        //     }}
         
       
              style={{
                backgroundColor: colors.themeColor,
                borderRadius: 5,
                width: 120,
                height: 40,
                justifyContent:"center",
                alignContent:"center", 
                // marginLeft:280,
                // marginTop:-10
              }}
            >
              <Text style={{ color: "white", fontSize: 15,marginLeft:10}}>Place Your Order</Text>
            </TouchableOpacity>
        </View>
            </View>
        )
    }
}
const mapStateToProps=state=>{

    return(
      {
        listItems:state.home.listItems,
        price:state.home.price,
        total:state.home.total
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
    scrollView:
    {
        backgroundColor: "white",
        height: 240,
        marginTop: 10,
        position: "relative",
        // borderBottomWidth:.5,
      padding:10
      
    }
   })

export default connect(mapStateToProps)(Cart)