import types from "../types";

// import {apiDelete, apiGet, apiPost, apiPut} from '../../utils/utils';

export function increment(data){
  return{
    type: types.HOMEPAGE,
    payload:data
  };
}