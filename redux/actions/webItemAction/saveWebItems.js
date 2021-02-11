
import { pushErrors } from '../error';

import webItemAPI from '../../../api/webItems'
import {FETCH_WEB_ITEMS_SUCCESS} from "../../reducers/webItemReducer/webItems";
import { SAVE_WEB_ITEMS_SUCCESS} from "../../reducers/webItemReducer/saveWebItems";
import {SET_EDIT_WEB_ITEM_COPY,
  UPDATE, CREATE, DELETE,
} from "../../reducers/webItemReducer/editWebItem";
import {normalize} from "normalizr";
import { arrayOfWebItem, arrayOfWebSection } from "../../../schemas";
import {SET_READ_ONLY} from "../../reducers/ux";
import dataURIToBlob from "../../../helpers/dataURIToBlob";

const compare = async (newData, prefix) => {
  let mediaFiles = {}

  const valueArray =  Object.keys(newData).map(k => newData[k])
  console.log(valueArray)
  const createList = valueArray.filter(c => c.action === CREATE).map(
    c => {
      if('picture_url' in c) {
        mediaFiles[`${prefix}_${c.id}`] = dataURIToBlob(c.picture_url)
        delete c.picture_url
      }
      return c
    }
  )
  console.log(createList)
  const updateList =  valueArray.filter(c => c.action === UPDATE).map(
    c => {
      if(c.pictureUpdated === true) {
        mediaFiles[`${prefix}_${c.id}`] = dataURIToBlob(c.picture_url)
        delete c.picture_url
      }
      return c
    }
  )
  console.log(updateList)
  const deleteList =  valueArray.filter(c => c.removed === true).map(
    c => {
      delete c.picture_url
      return c
    }
  )
  console.log(deleteList)
  return {
    mediaFiles,
    createList: await JSON.stringify(createList),
    updateList:  await JSON.stringify(updateList),
    deleteList:  await JSON.stringify(deleteList)
  }
}

export const saveWebItems = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  const {
    webItems: newWebItemsData,
    webSections: newWebSectionsData
  } = await getState().editWebItem

  try {


    console.log(newWebSectionsData)
    let multiPartWebSectionsData = await compare(newWebSectionsData, 'section_image')
    console.log(multiPartWebSectionsData)
    let multiPartWebItemsData = await compare(newWebItemsData, 'item_image')

    console.log(multiPartWebItemsData)
    const { mediaFiles: webItemsMediaFiles,
    createList: webItemsCreateList,
    updateList: webItemsUpdateList,
    deleteList: webItemsDeleteList
    } = multiPartWebItemsData

    const { mediaFiles: webSectionsMediaFiles,
      createList: webSectionsCreateList,
      updateList: webSectionsUpdateList,
      deleteList: webSectionsDeleteList
    } = multiPartWebSectionsData

    const multiPartData = {
      webItemsCreateList,
      webItemsUpdateList,
      webItemsDeleteList,
      webSectionsCreateList,
      webSectionsUpdateList,
      webSectionsDeleteList,
      ...webItemsMediaFiles,
      ...webSectionsMediaFiles
    }

    console.log( '...')

    const json = await webItemAPI(apiEngine).update(multiPartData)
    const normalizedWebSections = await normalize(json.data.data.webSections, arrayOfWebSection)
    let webSections = normalizedWebSections.entities.webSections
    if(typeof webSections === 'undefined') webSections = {}
    const normalizedWebItems = await normalize(json.data.data.webItems, arrayOfWebItem)
    let webItems = normalizedWebItems.entities.webItems
    if(typeof webItems === 'undefined') webItems = {}
    dispatch({type: SAVE_WEB_ITEMS_SUCCESS, data: {webItems, webSections}})
    dispatch({type: SET_READ_ONLY, listName: 'webItem', value: true})
    dispatch({type: SET_EDIT_WEB_ITEM_COPY, data: {webItems, webSections}})
    dispatch({type: FETCH_WEB_ITEMS_SUCCESS, data: {webItems: null, webSections: null} } )
    dispatch({type: FETCH_WEB_ITEMS_SUCCESS, data: {webItems, webSections}})


  } catch (err) {
    dispatch(pushErrors(err))
  }
};

