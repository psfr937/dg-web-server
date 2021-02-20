
import inventories from "./inventories";
import oneInventory from "./oneInventory";


import { combineReducers } from 'redux'

const reducer = {
  inventories,
  oneInventory
}


export default combineReducers(reducer)