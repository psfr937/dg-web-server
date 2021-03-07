import staffAPI from '../../../api/staffs'
import {FETCH_STAFFS_SUCCESS, FETCH_STAFFS_REQUESTING, FETCH_STAFFS_FAILURE} from "../../reducers/staffReducer/staffs";
import {SET_EDIT_STAFF_COPY} from "../../reducers/staffReducer/editStaff";
import { normalize, schema } from "normalizr";
import { arrayOfStaff } from '../../../schemas/index'
import {select, put, call, takeEvery} from "redux-saga/effects"
export const fetchStaffs = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  const status = getState().staffs.readyStatus;
  if(status === FETCH_STAFFS_SUCCESS ||
    status ===  FETCH_STAFFS_REQUESTING
  ) return
  dispatch({type: FETCH_STAFFS_REQUESTING});
  try {
    const json = await staffAPI(apiEngine).list();
    const normalizedData = await normalize(json.data.data, arrayOfStaff)
    let data = normalizedData.entities.staffs;
    if(typeof data === 'undefined') data = {};
    dispatch({type: FETCH_STAFFS_SUCCESS, data: data});
    dispatch({type: SET_EDIT_STAFF_COPY, data: data})
  } catch (err) {
    dispatch({type: FETCH_STAFFS_FAILURE, err: err})
  }
};

