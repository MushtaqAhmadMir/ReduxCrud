import types from "../types";

const initialState={
    userData:{
    
    }
}


export default function (state=initialState,action) {
    

    switch (action.type){

        case types.LOGIN:{
            console.log(action.payload,"in login function")
            const userData={...action.payload}


            return {...state,userData}
        }
    

        default:{
            return {...state}
        }

       }
        
}