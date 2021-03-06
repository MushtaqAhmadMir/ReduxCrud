import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, 
  Image,
  Dimensions} from 'react-native';

import Carousel, {Pagination}from 'react-native-snap-carousel';
import imagePath from '../constants/imagePath';
// import { Pagination } from 'react-native-snap-carousel';

const{width,height} =Dimensions.get("screen")

export default class SnapCarousel extends React.Component {

 
    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              image:imagePath.slide1
          },
          {
            image:imagePath.slide2
          },
          {
            image:imagePath.slide3
          },
          {
            image:imagePath.slide4
          },
          {
            image:imagePath.slide5
          },
        ]
      }
    }

    get pagination () {
        const { carouselItems,activeIndex } = this.state;
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
                  backgroundColor: 'black',
                  
        
              }}
              inactiveDotStyle={{
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }


    _renderItem({item,index}){
        return (
          <View style={{
              marginTop:10,
            //   backgroundColor:'red',
              borderRadius: 5,
              height: 300,
              width:'100%',
            //   marginLeft: 25,
            //   marginRight: 25,
               }}>
            <Image style={{resizeMode:"cover",height:200,width:"100%"}} source={item.image}/>
          </View>

        )
    }

    render() {
        return (
          
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <View>
                <Carousel
                  layout={"default"}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={width}
                  itemWidth={400}
                  renderItem={this._renderItem}
                  loop={true}
                    loopClonesPerSide={3}
                    autoplay={true}
                    autoplayDelay={2000}
                    autoplayInterval={2000}
                  onSnapToItem = { index => this.setState({activeIndex:index}) } />
                  <View>
                { this.pagination }
                </View>
                </View>
                
            </View>
          
        );
    }
}

