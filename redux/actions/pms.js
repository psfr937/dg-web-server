

import pmAPI from '../../api/pms'
import { ADD_PM_INVALID, ADD_PM_FAILURE, ADD_PM_REQUESTING} from "../reducers/pms/addPm";
import {  FETCH_PMS_SUCCESS, } from "../reducers/pms/fetchPms";
import { SELECT_PM } from "../reducers/pms/selectPm";
import router from 'next/router'

import {normalize} from "normalizr";
import {arrayOfPms} from "../../schemas";

import {pushErrors} from "./errorAction";


export const fetchPms = () => async (
  dispatch,
  getState,
  apiEngine
) => {

  if(getState().fetchPms.readyStatus === FETCH_PMS_SUCCESS) return
  try {
    const json = await pmAPI(apiEngine).list()
    const normalizedData = await normalize(json.data.data, arrayOfPms)
    console.log(normalizedData)
    let pms = normalizedData.entities.pms
    if(typeof pms === 'undefined') pms = {}

    dispatch({type: FETCH_PMS_SUCCESS, data: pms})
  } catch (err) {
    dispatch(pushErrors(err))
  }
};

export const addPm = (token) => async (
  dispatch,
  getState,
  apiEngine
) => {
  const readyStatus = getState().addPm.readyStatus;
  if (readyStatus !== ADD_PM_INVALID &&
    readyStatus !== ADD_PM_FAILURE
  ) return

  dispatch({type: ADD_PM_REQUESTING});
  const json = await pmAPI(apiEngine).addPaymentMethod({ token});
  console.log(json.data.data);

  return json.data.data
};

export const selectPm = (id) => async( dispatch,
getState,
apiEngine,
) => {
  dispatch({type: SELECT_PM, data: id});
};

