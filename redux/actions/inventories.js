import inventoryAPI from '../../api/inventories'
import { normalize, schema } from "normalizr";
import { arrayOfInventories } from '../../schemas/index'
import {
  FETCH_INVENTORIES_REQUESTING,
  FETCH_INVENTORIES_SUCCESS,
  FETCH_INVENTORIES_FAILURE, FETCH_INVENTORIES
} from "../reducers/inventories";
import {
  FETCH_ONE_INVENTORY_FAILURE,
  FETCH_ONE_INVENTORY_SUCCESS,
  FETCH_ONE_INVENTORY_REQUESTING, FETCH_ONE_INVENTORY, SELECT_INVENTORY_ID
} from "../reducers/oneInventory";

import { all, select, put, call, fork, takeEvery } from "redux-saga/effects"


// function *fetchInventories(){
//   const status = select( state => state.inventories.readyStatus);
//   if(status === FETCH_INVENTORIES_SUCCESS ||
//     status ===  FETCH_INVENTORIES_REQUESTING
//   ) return
//   yield put({type: FETCH_INVENTORIES_REQUESTING});
//
//   try {
//     const json = yield call(inventoryAPI.list);
//     const normalizedData = yield call(normalize, json.data.data, arrayOfInventories);
//     let data = normalizedData.entities.inventories;
//     if(typeof data === 'undefined') data = {};
//
//     yield put({type: FETCH_INVENTORIES_SUCCESS, data: data})
//   } catch (err) {
//     yield put({type: FETCH_INVENTORIES_FAILURE, data: data})
//   }
// }
//
// function *fetchInventories_2(){
//   const status = select( state => state.inventories.readyStatus);
//   if(status === FETCH_INVENTORIES_SUCCESS ||
//     status ===  FETCH_INVENTORIES_REQUESTING
//   ) return
//   yield put({type: FETCH_INVENTORIES_REQUESTING});
//
//   try {
//     const json = yield call(inventoryAPI.list);
//     const normalizedData = yield call(normalize, json.data.data, arrayOfInventories);
//     let data = normalizedData.entities.inventories;
//     if(typeof data === 'undefined') data = {};
//
//     yield put({type: FETCH_INVENTORIES_SUCCESS, data: data})
//   } catch (err) {
//     yield put({type: FETCH_INVENTORIES_FAILURE, data: data})
//   }
// }


function *fetchOneInventory({ pid }){
  console.log('lolololololololol')
  let oneInventory = select(state => state.oneInventory);

  if(pid in oneInventory &&
    (oneInventory[pid].readyStatus === FETCH_ONE_INVENTORY_SUCCESS ||
      oneInventory[pid].readyStatus ===  FETCH_ONE_INVENTORY_REQUESTING)
  ) return;

  yield put({type: SELECT_INVENTORY_ID, id: pid});
  yield put({type: FETCH_ONE_INVENTORY_REQUESTING, pid: pid});

  try {
    const json = yield call(inventoryAPI.get, pid);
    yield put({type: FETCH_ONE_INVENTORY_SUCCESS, pid: pid, data: json.data.data});

  } catch (err) {
    yield put({type: FETCH_ONE_INVENTORY_FAILURE, pid: pid, err: err})
  }
}

function* rootSaga() {

 // yield takeEvery(FETCH_INVENTORIES, fetchInventories);
  yield takeEvery(FETCH_ONE_INVENTORY, fetchOneInventory);


}

export default rootSaga;


//
//
// export const serverGetInventory = async (pid, ctx) =>  {
//   try {
//     const json = await inventoryAPI.serverGet(pid, ctx);
//
//     return {type: FETCH_ONE_INVENTORY_SUCCESS, pid: pid, data: json.data.data}
//   } catch (err) {
//
//     return {type: FETCH_ONE_INVENTORY_FAILURE, pid: pid, err: err}
//   }
// };
//
//
// export const resetEditInventories = () => async (
//   dispatch,
//   getState,
//   apiEngine
// ) => {
//   const originalData = getState().inventories.data
// };
