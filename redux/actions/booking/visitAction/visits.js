
import { pushErrors } from '../error';

import visitAPI from '../../../../api/ecommerce/visits'
import {FETCH_VISITS_SUCCESS,
  FETCH_VISITS_REQUESTING
} from "../../../reducers/booking/visitReducer/visits";
import {SET_EDIT_VISIT_COPY} from "../../../reducers/booking/visitReducer/editVisit";
import { normalize, schema } from "normalizr";
import {arrayOfStaff, arrayOfVisit} from '../../../../schemas'
import {SET_EDIT_SERVICE_COPY} from "../../../reducers/booking/serviceReducer/editService";
import {select, put, call, takeEvery} from "redux-saga/effects"


export const fetchVisits = (id) => async (
  dispatch,
  getState,
  apiEngine
) => {
  const readyStatus = getState().visits.readyStatus;
  if(readyStatus === FETCH_VISITS_SUCCESS ||
    readyStatus === FETCH_VISITS_REQUESTING
  ) return
  try {
    const json = await visitAPI(apiEngine).list(id);
     console.log(json.data.data)
    const normalizedData =  await normalize(json.data.data, arrayOfVisit);
    let data = normalizedData.entities.visits;
    if(typeof data === 'undefined') data = {};
    console.log(data);
    if(typeof id === 'number') {
      dispatch({type: FETCH_VISITS_SUCCESS, clientId: id, data: data});
    }
    dispatch({type: SET_EDIT_VISIT_COPY, data: data});
    console.log(getState().visits)
  } catch (err) {
    dispatch(pushErrors(err))
  }
};

export function* resetEditVisits({clientId}){
  console.log(clientId)
  if(clientId >= 0) {
    const originalData = yield select(state => state.visits[clientId].data);
    dispatch({type: SET_EDIT_VISIT_COPY, data: originalData})
  }


};

