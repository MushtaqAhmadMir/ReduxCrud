import { INFINITE_API } from "../../config/urls";
import { apiPost } from "../../utils/utils";
import store from "../store";
import types from "../types";

const {dispatch}=store

export function addData(data){
  
  dispatch({
    type: types.ADD_DATA,
    payload:data
  
  })
    
    
}
export function deleteItem(id){
  dispatch({
    type:types.DELETE_ITEM,
    payload:id
  
  })
    
}

export function changeValue(id){
  console.log("id in actions", id)
  dispatch({
    type:types.CHANGE_VALUE,
    payload:id
  })
}
export function decrementValue(id){
  console.log("id in actions", id)
  dispatch({
    type:types.DECREMENT_VALUE,
    payload:id
  })
}
export function totalPrice(id){
  console.log("id in actions", id)
  dispatch({
    type:types.TOTAL_PRICE,
    payload:id
  })
}
export function getInfiniteItems(data = {}){
  return new Promise((resovle,reject)=>
  {
    apiPost(INFINITE_API, data).then(res=>{
      // setUserData(res.data);
      resovle(res)
    }).catch(error=>
    {
  reject(error)
    })
  })

}
