
import { pushErrors } from './errorAction';
import { arrayOfData } from "../../schemas";
import { normalize } from "normalizr";
import submitAnswerAPI from "../../api/submitAnswer"
import { SUBMIT_ANSWER_SUCCESS } from "../reducers/submitAnswer";

export const submitAnswer = (data) => async (
  dispatch,
  getState,
  apiEngine
) => {

  if(getState().submitAnswer.readyStatus === SUBMIT_ANSWER_SUCCESS) return
  try {
    const json = await submitAnswerAPI(apiEngine).update(data)
    const normalizedData = await normalize(json.data.data, arrayOfData)
    let data = normalizedData.entities.data
    if(typeof data === 'undefined') data = {}

    dispatch({type: SUBMIT_ANSWER_SUCCESS, data: data})
  } catch (err) {
    dispatch(pushErrors(err))
  }
};
