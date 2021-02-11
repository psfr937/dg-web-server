
import { pushErrors } from './errorAction';
import { arrayOfData } from "../../schemas";
import { normalize } from "normalizr";

import {FETCH_DATA_SUCCESS} from "../reducers/fetchData";

export const fetchData = () => async (
  dispatch,
  getState,
  apiEngine
) => {

  if(getState().fetchData.readyStatus === FETCH_DATA_SUCCESS) return
  try {
    const originalData = [
      {
        id: 1,
        name: 'test1',
        date: 'now',
        content: 'content'
      },
      {
        id: 2,
        name: 'test2',
        date: 'now2',
        content: 'content2'
      }
    ]
    const normalizedData = await normalize(originalData, arrayOfData)
    let data = normalizedData.entities.data
    if(typeof data === 'undefined') data = {}
    console.log(data)

    dispatch({type: FETCH_DATA_SUCCESS, data: data})
  } catch (err) {
    dispatch(pushErrors(err))
  }
};
