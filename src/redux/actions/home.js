import types from "../types";

export function Hompage(data){
  console.log(data,"in actions")
  return{
    
    type: types.HOMEPAGE,
    payload:data
  };
}
export function deleteItem(index){
  console.log("in actions")
  return{
    type:types.DELETE_ITEM,
    payload:index
  };
}