import {LOGIN, SIGNUP} from '../config/urls';

import {apiPost, setItem, setUserData} from "../utils/utils"


export function login(data = {}){
  return new Promise((resovle,reject)=>
  {
    apiPost(LOGIN, data).then(res=>{
      setUserData(res.data);
      resovle(res)
    }).catch(error=>
    {
  reject(error)
    })
  })

}
export function signup(data = {}){
  return new Promise((resovle,reject)=>
  {
    apiPost(SIGNUP, data).then(res=>{
      setUserData(res.data);
      resovle(res)
    }).catch(error=>
    {
  reject(error)
    })
  })

}

// export function signup(data = {}){
//   return apiPost(SIGNUP, data)
// }
