import inventoriesAPI from '../../../api/cms/inventories'
import dataURIToBlob from "../../../helpers/dataURIToBlob";
import {call, select, put, takeEvery} from "redux-saga/effects";
import router from 'next/router'
export const ADD_INVENTORY = 'ADD_INVENTORY';
export const UPDATE_INVENTORY = 'UPDATE_INVENTORY';
export const REMOVE_INVENTORIES = 'REMOVE_INVENTORIES';

function* addInventory() {
  const originalData = (yield select(state => state.oneInventory)).data;
  const editInventory = yield select( state => state.editInventory);
  
  const imageDiff = compareImages(originalData.images, editInventory.images);
  const tagDiff = compareIds(
    originalData.tags.map(i => i.id),
    editInventory.tags.map(i => i.id)
  );

  console.log(originalData.sizes)
  console.log(editInventory.sizes)

  const sizeDiff = compareIds(
    originalData.sizes.map(i => i.id),
    editInventory.sizes.map(i => i.id)
  );
  const jsonData = {
    price: editInventory.price,
    brand: editInventory.brand,
    sellerId: editInventory.seller.id,
    texts: editInventory.text,
    images: {
      remove: imageDiff.remove //list of item_order
    },
    tags: {
      insert: tagDiff.insert ,//tagId array
      remove:  tagDiff.remove //tagId array
    },
    sizes: {
      insert: sizeDiff.insert, //sizeId array
      remove: sizeDiff.remove //sizeId array
    }
  };

  console.log(jsonData)

  const files = {};

  editInventory.images
    .filter(i => 'file' in i)
    .forEach(i => {
      const blob = dataURIToBlob(i.url);
      files[`image-${editInventory.id}-${i.order}`] =  blob
    });

  console.log(jsonData)
  console.log(files)

  try {
    const json = yield call(inventoriesAPI.addInventory,
      {
        ...files,
        data: JSON.stringify(jsonData)
      }
    );

    const id = json.data.data;
    router.push(`/cms/product/p/${id}`)

  }
  catch(err){

  }
}

const compareIds = (a, b) => {
  const remove = a.filter(i => b.indexOf(i) < 0);
  const insert = b.filter(i => a.indexOf(i) < 0);
  return {
    insert, remove
  }
};

const compareImages = (original, newData) => {
  const originalOrderList = original.map(d => d.order);
  const newDataOrderList = newData.map(d => d.order);
  console.log(originalOrderList);
  console.log(newDataOrderList);
  const remove = originalOrderList.filter(o => newDataOrderList.indexOf(o) < 0)
  return {
    remove
  }
};

function* updateInventory() {
  const originalData = (yield select(state => state.oneInventory)).data;
  const editInventory = yield select( state => state.editInventory);


  const imageDiff = compareImages(originalData.images, editInventory.images);
  const tagDiff = compareIds(
    originalData.tags.map(i => i.id),
    editInventory.tags.map(i => i.id)
  );

  console.log(originalData.sizes);
  console.log(editInventory.sizes);

  const sizeDiff = compareIds(
    originalData.sizes.map(i => i.id),
    editInventory.sizes.map(i => i.id)
  );
  const jsonData = {
    price: editInventory.price,
    brand: editInventory.brand,
    sellerId: editInventory.seller.id,
    texts: editInventory.text,
    images: {
      remove: imageDiff.remove //list of item_order
    },
    tags: {
      insert: tagDiff.insert ,//tagId array
      remove:  tagDiff.remove //tagId array
    },
    sizes: {
      insert: sizeDiff.insert, //sizeId array
      remove: sizeDiff.remove //sizeId array
    }
  };

  console.log(jsonData)

  const files = {};

  editInventory.images
    .filter(i => 'file' in i)
    .forEach(i => {
      const blob = dataURIToBlob(i.url);
      files[`image-${editInventory.id}-${i.order}`] =  blob
    });

  console.log(jsonData)
  console.log(files)

  try {
    const json = yield call(inventoriesAPI.updateInventory,
      {
        ...files,
        data: JSON.stringify(jsonData)
      },
      editInventory.id
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
