
import { pushErrors } from '../error';

import webItemsAPI from '../../../api/webItems'
import {FETCH_WEB_ITEMS_SUCCESS, FETCH_WEB_ITEMS_REQUESTING} from "../../reducers/webItemReducer/webItems";
import {SET_EDIT_STAFF_COPY} from "../../reducers/staffReducer/editStaff";
import { normalize, schema } from "normalizr";
import {arrayOfWebItem, arrayOfWebSection} from '../../../schemas/index'
import {ADD_EDIT_WEB_ITEM_ROW, SET_EDIT_WEB_ITEM_COPY} from "../../reducers/webItemReducer/editWebItem";
import { EDIT_WEB_ITEM_ROW, EDIT_WEB_SECTION_ROW } from "../../reducers/webItemReducer/editWebItem";

export const serverFetchWebItems = () => async (
  dispatch,
  getState,
  apiEngine
) => {
   const json = await webItemsAPI(apiEngine).list()
   console.log(json.data.data)
   const normalizedWebItem =  await normalize(json.data.data.webItems, arrayOfWebItem)
   let webItemData = normalizedWebItem.entities.webItems
   if(typeof  webItemData === 'undefined')  webItemData = {}

   const normalizedWebSection =  await normalize(json.data.data.webSections, arrayOfWebSection)
   let webSectionData = normalizedWebSection.entities.webSections
   if(typeof  webSectionData === 'undefined')  webSectionData = {}
   
   return {
      webItems: webItemData,
      webSections: webSectionData
   }

};

export const addWebItem = () => async (
  dispatch,
  getState,
  apiEngine
) => {
   const selectedWebComponent = getState().ux.selectedWebEditComponent
   if(selectedWebComponent.componentType === 'SECTION') {
      dispatch({
         type: ADD_EDIT_WEB_ITEM_ROW,
         section_id: selectedWebComponent.nthOfType,
         ranking: 1
      })
   }
}

export const removeWebComponent = () => async (
  dispatch,
  getState,
  apiEngine
) => {
   const selectedWebComponent = getState().ux.selectedWebEditComponent
   if(selectedWebComponent.componentType === 'SECTION') {
      dispatch({
         type: EDIT_WEB_SECTION_ROW,
         id: selectedWebComponent.nthOfType,
         field: 'removed',
         value: true
      })
   }
   else if(selectedWebComponent.componentType === 'ITEM'){
      dispatch({
         type: EDIT_WEB_ITEM_ROW ,
         id: selectedWebComponent.nthOfType,
         field: 'removed',
         value: true
      })
   }
}

export const storeFetchedWebItems = (webItems, webSections) => async (
  dispatch,
  getState,
  apiEngine
) => {

   dispatch({type: FETCH_WEB_ITEMS_SUCCESS, data: {webItems, webSections}})

   Object.keys(webItems).map(k => {
      webItems[k].files = null
      webItems[k].fileErrors = null
   })

   Object.keys(webSections).map(k => {
      webSections[k].files = null
      webSections[k].fileErrors = null
   })


   dispatch({
      type: SET_EDIT_WEB_ITEM_COPY,
      data: {webItems, webSections}
   })

};


