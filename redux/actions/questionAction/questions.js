
import { pushErrors } from '../errorAction';

import questionAPI from '../../../api/questions'
import {SET_EDIT_QUESTION_COPY} from "../../reducers/questionReducer/editQuestion";
import { normalize, schema } from "normalizr";
import { arrayOfQuestion } from '../../../schemas/index'
import {
  FETCH_QUESTIONS_REQUESTING,
  FETCH_QUESTIONS_SUCCESS
} from "../../reducers/questionReducer/questions";

export const fetchQuestions = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  const status = getState().questions.readyStatus
  if(status === FETCH_QUESTIONS_SUCCESS ||
    status ===  FETCH_QUESTIONS_REQUESTING
  ) return
  dispatch({type: FETCH_QUESTIONS_REQUESTING})
  try {
    const json = await questionAPI(apiEngine).list()
    console.log(json)
    const normalizedData = await normalize(json.data.data, arrayOfQuestion)
    let data = normalizedData.entities.questions
    if(typeof data === 'undefined') data = {}
    console.log(data)
    dispatch({type: FETCH_QUESTIONS_SUCCESS, data: data})
    dispatch({type: SET_EDIT_QUESTION_COPY, data: data})
  } catch (err) {
    dispatch(pushErrors(err))
  }
};


export const resetEditQuestions = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  const originalData = getState().questions.data
  dispatch({type: SET_EDIT_QUESTION_COPY, data: originalData})


};
