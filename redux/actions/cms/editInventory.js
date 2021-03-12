import inventoriesAPI from '../../../api/cms/inventories'
import dataURIToBlob from "../../../helpers/dataURIToBlob";
import {call, select, put, takeEvery} from "redux-saga/effects";

export const ADD_INVENTORY = 'ADD_INVENTORY';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY';
export const REMOVE_INVENTORIES = 'REMOVE_INVENTORIES';

function* addInventory() {
  const editInventory = yield select( state => state.editInventory);
  const dataUrls = editInventory.attachment.pictures;

  const jsonData = {
    body: editInventory.body,
    title: editInventory.title,
    nameZh: editInventory.nameZh,
    nameEn: editInventory.nameEn,
    descriptionZh: editInventory.descriptionZh,
    descriptionEn: editInventory.descriptionEn,
    tags: editInventory.tags,
    sizes: editInventory.sizes
  };

  const files = {};
  dataUrls.map((d, i) => {
    const blob = dataURIToBlob(d);
    console.log(blob);
    files[`image_${i}`] =  blob
  });

  try {
    const json = yield call(inventoriesAPI.addInventory,
      {
        ...files,
        data: JSON.stringify(jsonData)
      }
    )
  }
  catch(err){

  }
}


function* updateInventory({ id }) {
  const editInventory = yield select( state => state.editInventory);
  const dataUrls = editInventory.attachment.pictures;

  const jsonData = {
    body: editInventory.body,
    title: editInventory.title,
    nameZh: editInventory.nameZh,
    nameEn: editInventory.nameEn,
    brandId: editInventory.brandId,
    descriptionZh: editInventory.descriptionZh,
    descriptionEn: editInventory.descriptionEn,
    tags: editInventory.tags,
    sizes: editInventory.sizes
  };

  const files = {}
  dataUrls.map((d, i) => {
    const blob = dataURIToBlob(d);
    files[`image_${i}`] =  blob
  });

  try {
    const json = yield call(inventoriesAPI.updateInventory,
      {
        ...files,
        data: JSON.stringify(jsonData)
      },
      id
    )
  }
  catch(err){

  }
}

function* removeInventories({ id }) {
  const editInventory = yield select( state => state.editInventory);
  const dataUrls = editInventory.attachment.pictures;

  const jsonData = {
    body: editInventory.body,
    title: editInventory.title,
    nameZh: editInventory.nameZh,
    nameEn: editInventory.nameEn,
    descriptionZh: editInventory.descriptionZh,
    descriptionEn: editInventory.descriptionEn,
    tags: editInventory.tags,
    sizes: editInventory.sizes
  };

  const files = {}
  dataUrls.map((d, i) => {
    const blob = dataURIToBlob(d);
    console.log(blob)
    files[`image_${i}`] =  blob
  });

  try {
    const json = yield call(inventoriesAPI.updateInventory,
      {
        ...files,
        data: JSON.stringify(jsonData)
      },
      id
    )
  }
  catch(err){

  }
}

export default[
  takeEvery(ADD_INVENTORY, addInventory),
  takeEvery(UPDATE_INVENTORY, updateInventory),
  takeEvery(REMOVE_INVENTORIES, removeInventories)
]
