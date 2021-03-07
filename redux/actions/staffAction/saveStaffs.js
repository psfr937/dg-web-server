import staffAPI from '../../../api/staffs'
import {FETCH_STAFFS_FAILURE, FETCH_STAFFS_SUCCESS} from "../../reducers/staffReducer/staffs";
import { SAVE_STAFFS_SUCCESS} from "../../reducers/staffReducer/saveStaffs";
import {SET_EDIT_STAFF_COPY,
  UPDATE, CREATE, DELETE
} from "../../reducers/staffReducer/editStaff";
import {SET_READ_ONLY} from "../../reducers/ux";
import {SET_EDIT_SERVICE_COPY} from "../../reducers/serviceReducer/editService";
import {normalize} from "normalizr";
import {arrayOfStaff} from "../../../schemas";
import {select, put, call, takeEvery} from "redux-saga/effects"

const compare = (newData) => {
  const valueArray =  Object.keys(newData).map(k => newData[k]);
  const createList = valueArray.filter(c => c.action === CREATE);
  const updateList =  valueArray.filter(c => c.action === UPDATE);
  const deleteList =  valueArray.filter(c => c.action === DELETE);
  return {
    createList, updateList, deleteList
  }
}

export const saveStaffs = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  const newData = getState().editStaff;
  const updateDetail = compare(newData);
  console.log(updateDetail);
  try {
    const json = await staffAPI(apiEngine).update(updateDetail);
    const normalizedData = await normalize(json.data.data, arrayOfStaff);
    const data = normalizedData.entities.staffs
    dispatch({type: SAVE_STAFFS_SUCCESS, data: data});
    dispatch({type: SET_READ_ONLY, listName: 'staffList', value: true});
    dispatch({type: SET_EDIT_STAFF_COPY, data: data});
    dispatch({type: FETCH_STAFFS_SUCCESS, data: data})
  } catch (err) {
    dispatch({type: FETCH_STAFFS_FAILURE, err: err})
  }
};

