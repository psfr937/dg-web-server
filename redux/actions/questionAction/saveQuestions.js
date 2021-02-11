
import { pushErrors } from '../errorAction';

import questionAPI from '../../../api/questions'
import {FETCH_QUESTIONS_SUCCESS} from "../../reducers/questionReducer/questions";
import { SAVE_QUESTIONS_SUCCESS} from "../../reducers/questionReducer/saveQuestions";
import {SET_EDIT_QUESTION_COPY,
  UPDATE, CREATE, DELETE
} from "../../reducers/questionReducer/editQuestion";
import {normalize} from "normalizr";
import {SET_READ_ONLY} from "../../reducers/ux";
import {arrayOfQuestion} from "../../../schemas";
import dataURIToBlob from "../../../helpers/dataURIToBlob";



const compare = async (newData) => {
  let mediaFiles = {}

  const valueArray =  Object.keys(newData).map(k => newData[k])
  const createList = valueArray.filter(c => c.action === CREATE).map(
    c => {
      if(c.picture_url !== null) {
        mediaFiles[`image_${c.id}`] = dataURIToBlob(c.picture_url)
      }
      delete c.picture_url
      return c
    }
  )
  const updateList =  valueArray.filter(c => c.action === UPDATE).map(
    c => {
      if(c.pictureUpdated === true) {
        mediaFiles[`image_${c.id}`] = dataURIToBlob(c.picture_url)
        delete c.picture_url
      }
      return c
    }
  )
  const deleteList =  valueArray.filter(c => c.removed === true).map(
    c => {
      delete c.picture_url
      return c
    }
  )

  return {
    ...mediaFiles,
    createList: await JSON.stringify(createList),
    updateList:  await JSON.stringify(updateList),
    deleteList:  await JSON.stringify(deleteList)
  }
}

export const saveQuestions = () => async (
  dispatch,
  getState,
  apiEngine
) => {

  const newData = getState().editQuestion
  let multiPartData = await compare(newData)
  try {

    const json = await questionAPI(apiEngine).update(multiPartData)
    const normalizedData = await normalize(json.data.data, arrayOfQuestion)
    const data = normalizedData.entities.questions
    dispatch({type: SAVE_QUESTIONS_SUCCESS, data: data})
    dispatch({type: SET_READ_ONLY, listName: 'questionList', value: true})
    dispatch({type: SET_EDIT_QUESTION_COPY, data: data})
    dispatch({type: FETCH_QUESTIONS_SUCCESS, data: data})
  } catch (err) {
    dispatch(pushErrors(err))
  }
};
