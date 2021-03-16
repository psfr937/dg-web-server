import {FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from "../../reducers/cms/users";
import userAPI from "../../../api/ecommerce/user";
import {normalize} from "normalizr";
import {arrayOfUsers} from "../../../schemas";
export const FETCH_USERS = 'FETCH_USERS'

import { call, select, put, takeEvery } from "redux-saga/effects"

function *users(){
  const readyStatus = select(state => state.readyStatus);
  if(readyStatus === FETCH_USERS_SUCCESS) return;
  try {
    const json = yield call(userAPI.list);
    const normalizedData = yield call(normalize, json.data.data, arrayOfUsers);
    console.log(normalizedData)
    let users = normalizedData.entities.users;
    if(typeof users === 'undefined') users = {};

    yield put({type: FETCH_USERS_SUCCESS, data: users})
  } catch (err) {
    yield put({type: FETCH_USERS_FAILURE, err: err})
  }
}

export default [
  takeEvery(FETCH_USERS, users),
]