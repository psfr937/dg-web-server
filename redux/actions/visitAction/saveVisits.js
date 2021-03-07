import visitAPI from '../../../api/visits'
import {FETCH_VISITS_FAILURE, FETCH_VISITS_SUCCESS} from "../../reducers/visitReducer/visits";
import { SAVE_VISITS_SUCCESS} from "../../reducers/visitReducer/saveVisits";
import {
  SET_EDIT_VISIT_COPY,
  UPDATE, CREATE, DELETE, ADD_EDIT_VISIT_ROW
} from "../../reducers/visitReducer/editVisit";
import {normalize} from "normalizr";
import {arrayOfVisit} from "../../../schemas";
import {SET_READ_ONLY} from "../../reducers/ux";
import {select, put, call, takeEvery} from "redux-saga/effects"

const compare = newData => {
  const valueArray =  Object.keys(newData).map(k => newData[k]);
  const createList = valueArray.filter(c => c.action === CREATE);
  const updateList =  valueArray.filter(c => c.action === UPDATE);
  const deleteList =  valueArray.filter(c => c.action === DELETE);

  return {
    createList, updateList, deleteList
  }
};

export function* saveVisits({clientId}){
  const newData = select(state=> state.editVisit);
  console.log(newData);
  const updateDetail = compare(newData);
  try {
    const json = yield call(visitAPI.update, clientId, updateDetail);
    const normalizedData = yield call(normalize, json.data.data, arrayOfVisit)
    const data = normalizedData.entities.visits;
    yield put({type: SAVE_VISITS_SUCCESS, data: data});
    yield put({type: SET_READ_ONLY, listName: 'visitList', value: true});
    yield put({type: SET_EDIT_VISIT_COPY, data: data});
    yield put({type: FETCH_VISITS_SUCCESS, clientId: clientId , data:data})
  } catch (err) {
    yield put({type: FETCH_VISITS_FAILURE, clientId: clientId , err: err})
  }
};

export function* addEditVisitRow(){
  yield put({type: ADD_EDIT_VISIT_ROW});
  return Math.min.apply(null, Object.keys(getState().editVisit))
}