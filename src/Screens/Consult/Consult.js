import axios from 'axios'
import React,{}from 'react'
import { Component } from 'react'
import { Text, View,FlatList,StyleSheet,Image } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../Components/Header'
import Loader from '../../Components/Loader'
import { GET_USERS } from '../../config/urls'
import actions from '../../redux/actions'
import fontFamily from '../../styles/fontFamily'


import {  apiPost,getHeaders } from '../../utils/utils'


 class Consult extends Component{
 
constructor(props)
{
    super();
    this.state={
        data:[],
        isLoading:false
    }
}
 

 
componentDidMount()
{
//     if(this.state.data.length>0)
//     {
//     let length=this.state.data.length
//     }
    console.log(GET_USERS,"url api")
    //  this.infiniteApi();
   apiPost(GET_USERS,
                  {"searchType":"LEADERBOARD",
                    "limit":"10",
                     "skip":"0"
   }).then((res)=>
   {
    this.setState({data:res.data})
       console.log(res)
   }).catch((err)=>
   {
       console.log(err)
    //    alert(error)
   })
 
    
}

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
 
renderItemComponent = (item) => 
{
 const{profileImg}  =item.item
//  const {image}=profileImg[0].original
//  console.log(image,"image")
 const {fullName,lookingFor}=item.item
    return(
        <View style={Styles.container}>
        <View style={{borderWidth: 0.5,height:240,margin:10}}>
          <Image style={Styles.img} source={{uri:item.item.profileImg[0].original}} />
          
          <Text style={Styles.text}>{fullName} </Text>
          <Text style={Styles.text2}>Looking for { lookingFor} </Text>
        </View>
      </View>
  );
}

    render()
    {
       console.log(this.state.data,"asdfghjkl")
        return(
            <View>
                <Header/>
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
                <Loader isLoading={isLoading}/>
            </View>
        )
    }
}
const mapStateToProps=state=>
{
    return({
        userData:state.auth.userData
    })
}
const Styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    //   flex: 1,
      height: 250,
    //   backgroundColor: 'red',
      flex: 1,
      margin:10
    },
    footer: {
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    img: {
      height: 240,
      width: 180,
    //   borderRadius: 20,
      position:"relative",
      resizeMode: 'cover',
    },
    text: {
    //   fontFamily: fontFamily.lobester,
    //   alignSelf: 'center',
      color: 'white',
      fontSize: 20,
      position:"absolute",
      bottom:40,
      left:10,
      fontWeight:"bold"

    },
    text2: {
        //   fontFamily: fontFamily.lobester,
        //   alignSelf: 'center',
          color: 'white',
          fontSize: 17,
          position:"absolute",
          bottom:15,
          left:10,
        //   fontWeight:"bold"
    
        },
   
  });
  
export default connect(mapStateToProps)(Consult)