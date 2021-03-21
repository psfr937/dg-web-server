import inventoryAPI from '../../../api/ecommerce/inventories'
import handleErrors, {CONNECTION_ERROR, SERVER_ERROR} from "../../../helpers/handleErrors";

import {
  FETCH_ONE_INVENTORY_FAILURE,
  FETCH_ONE_INVENTORY_SUCCESS,
  FETCH_ONE_INVENTORY_REQUESTING, FETCH_ONE_INVENTORY, SELECT_INVENTORY_ID
} from "../../reducers/ecommerce/oneInventory";

import { all, select, put, call, fork, takeEvery } from "redux-saga/effects"
import {CLONE_INVENTORY} from "../../reducers/cms/editInventory";
import router from 'next/router'
export const EMPTY_INVENTORY = 'EMPTY_INVENTORY';

function *fetchOneInventory({ pid, res }){
  let oneInventory = select(state => state.oneInventory);

  if(pid in oneInventory &&
    (oneInventory[pid].readyStatus === FETCH_ONE_INVENTORY_SUCCESS ||
      oneInventory[pid].readyStatus ===  FETCH_ONE_INVENTORY_REQUESTING)
  ) return;

  yield put({type: SELECT_INVENTORY_ID, id: parseInt(pid)});
  yield put({type: FETCH_ONE_INVENTORY_REQUESTING});

  try {
    const json = yield call(inventoryAPI.get, pid);
    yield all([
      put({type: CLONE_INVENTORY, pid: pid, data: json.data.data}),
      put({type: FETCH_ONE_INVENTORY_SUCCESS, data: json.data.data}),
    ]);
  } catch (err) {
    console.log(err);
    console.log(typeof err);
    console.log(JSON.stringify(err));
    const newErr = handleErrors(err);
    yield put({type: FETCH_ONE_INVENTORY_FAILURE, err: newErr});

      if(newErr.type === CONNECTION_ERROR){
        res.writeHead(302, { Location: '/error/disconnected' });
        res.end();

      }
      else{
        if(newErr.type === SERVER_ERROR){
          res.writeHead(302, { Location: '//error/denied' });
          res.end();
        }
      }

  }
}

function *emptyInventory({ data }){

    yield all([
      put({type: CLONE_INVENTORY,  data: data}),
      put({type: FETCH_ONE_INVENTORY_SUCCESS, data: data}),
    ]);

}


export default [
  takeEvery(FETCH_ONE_INVENTORY, fetchOneInventory),
  takeEvery(EMPTY_INVENTORY, emptyInventory)
]