
import imagePath from '../../constants/imagePath';
import types from '../types';
initialState = {
  listItems: [],
  price: 0,
  total:0,
  item:{}
};

export default function (state = initialState, action) {
  let newPrice =0
  switch (action.type) {
    case types.ADD_DATA: 
      let newArray = [...state.listItems, action.payload]
         
     console.log(newArray,"newAray")
        for (let i=0;i<newArray.length;i++)
        {
          newPrice=newPrice+newArray[i].reducedPrice
        }
      return {
        ...state,
         listItems:newArray,
           price: newPrice
      };
    

    case types.DELETE_ITEM: {
    //   console.log(action.payload, 'index in home page function');

      return {
        ...state,
        listItems: [
          ...state.listItems.filter((item) => item.id != action.payload),
        ],
      };
    }
    case types.CHANGE_VALUE: {
    //   console.log(action.payload,"id in home page function")
      let newArray = [...state.listItems];
     

    
      const index = newArray.findIndex((obj) => obj.id == action.payload);
      let obj = newArray[index];
      
      obj.qnt += 1

      let money = 0;

      for(let i = 0; i < newArray.length; i++){
          money += newArray[i].reducedPrice * newArray[i].qnt
      }
      console.log(money,"this is new money")
    

      console.log(newArray,"priceceeeee")

     

      return {
        ...state,
        listItems: newArray,
          price:money
      };
    }

    case types.DECREMENT_VALUE: {
         console.log(action.payload, 'decrement index in home page function');
         let newArray = [...state.listItems];
         const index = newArray.findIndex((obj) => obj.id == action.payload);
         let obj = newArray[index];
         
         obj.qnt -= 1
   
         let money = 0;
   
         for(let i = 0; i < newArray.length; i++){
             money += newArray[i].reducedPrice * newArray[i].qnt
         }
         console.log(money,"decrement price")
       
   
         console.log(newArray,"priceceeeee")
  
           return{

            ...state,
            listItems: newArray,
             price:money
           }   
        
      }
     

    default: {
      return {...state};
    }
  }
}
