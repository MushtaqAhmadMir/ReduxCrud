import imagePath from '../../constants/imagePath'
import types from '../types'
initialState={
    listItems:[

    ]
}

export default function (state=initialState,action) {
    

    switch (action.type){

        case types.HOMEPAGE:{
             console.log(action.payload,"in homepage function")
         
        return {
         ...state,
         listItems:[...state.listItems,action.payload]
        }
    }
    case types.DELETE_ITEM:{
        console.log(action.payload,"index in home page function")
    
   return {
    ...state,
    
   }
}
    

        default:{
            return {...state}
        }

       }
        
}