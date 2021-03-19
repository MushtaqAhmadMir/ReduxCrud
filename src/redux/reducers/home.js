import imagePath from '../../constants/imagePath'
import types from '../types'
initialState={
    listItems:[
             {
                 title:"Iphone 11",
                 image:imagePath.camera
             }
    ]
}

export default function (state=initialState,action) {
    

    switch (action.type){

        case types.HOMEPAGE:{
            // const userData={...action.payload}


            // return {...state,userData}
        }
    

        default:{
            return {...state}
        }

       }
        
}