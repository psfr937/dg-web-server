import productAPI from '../../../../api/ecommerce/products'
import {FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_SUCCESS} from "../../../reducers/booking/productReducer/products";
import { SAVE_PRODUCTS_SUCCESS} from "../../../reducers/booking/productReducer/saveProducts";
import {SET_EDIT_PRODUCT_COPY,
  UPDATE, CREATE, DELETE
} from "../../../reducers/booking/productReducer/editProduct";
import {normalize} from "normalizr";
import {SET_READ_ONLY} from "../../../reducers/ecommerce/ux";
import {arrayOfProduct} from "../../../../schemas";
import dataURIToBlob from "../../../../helpers/dataURIToBlob";
import {select, put, call, takeEvery} from "redux-saga/effects"


const compare = newData => {
  let mediaFiles = {};

  const valueArray =  Object.keys(newData).map(k => newData[k]);
  const createList = valueArray.filter(c => c.action === CREATE).map(
    c => {
      if(c.picture_url !== null) {
        mediaFiles[`image_${c.id}`] = dataURIToBlob(c.picture_url)
      }
      delete c.picture_url;
      return c
    }
  );
  const updateList =  valueArray.filter(c => c.action === UPDATE).map(
    c => {
      if(c.pictureUpdated === true) {
        mediaFiles[`image_${c.id}`] = dataURIToBlob(c.picture_url);
        delete c.picture_url
      }
      return c
    }
  )
  const deleteList =  valueArray.filter(c => c.removed === true).map(
    c => {
      delete c.picture_url;
      return c
    }
  )

  return {
    ...mediaFiles,
    createList: JSON.stringify(createList),
    updateList: JSON.stringify(updateList),
    deleteList: JSON.stringify(deleteList)
  }
}

export function* saveProducts(){

  const newData = yield select(state => state.editProduct);
  let multiPartData = compare(newData)
  try {

    const json = yield call(productAPI.update, multiPartData);
    const normalizedData = yield call(normalize, json.data.data, arrayOfProduct);
    const data = normalizedData.entities.products;
    yield put({type: SAVE_PRODUCTS_SUCCESS, data: data});
    yield put({type: SET_READ_ONLY, listName: 'productList', value: true});
    yield put({type: SET_EDIT_PRODUCT_COPY, data: data});
    yield put({type: FETCH_PRODUCTS_SUCCESS, data: data})
  } catch (err) {
    yield put({type: FETCH_PRODUCTS_FAILURE, err: err})
  }
}
