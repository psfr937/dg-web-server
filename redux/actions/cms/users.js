import {FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, FETCH_USERS_REQUESTING } from "../../reducers/cms/users";
import userAPI from "../../../api/ecommerce/user";
import {normalize} from "normalizr";
import {arrayOfUsers} from "../../../schemas";
export const FETCH_USERS = 'FETCH_USERS';

import { call, select, put, takeEvery } from "redux-saga/effects"
import {FETCH_DETAIL_INFO_REQUESTING} from "../../reducers/account/profile";

function *fetchUsers(){
  const readyStatus = yield select(state => state.users.readyStatus);
  if(readyStatus === FETCH_USERS_SUCCESS) return;

  yield put({ type: FETCH_USERS_REQUESTING });
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
  takeEvery(FETCH_USERS, fetchUsers),
]