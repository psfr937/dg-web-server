import inventoryAPI from '../../api/inventories'
import { normalize, schema } from "normalizr";
import { arrayOfInventories } from '../../schemas/index'
import {
  FETCH_INVENTORIES_REQUESTING,
  FETCH_INVENTORIES_SUCCESS,
  FETCH_INVENTORIES_FAILURE
} from "../reducers/inventories";
import {FETCH_ONE_INVENTORY_SUCCESS,
 FETCH_ONE_INVENTORY_FAILURE,
FETCH_ONE_INVENTORY_REQUESTING} from "../reducers/oneInventory";
import ApiEngine from "../../api/apiEngine";


export const fetchInventories = () => async (
  dispatch,
  getState
) => {
  const status = getState().inventories.readyStatus;
  if(status === FETCH_INVENTORIES_SUCCESS ||
    status ===  FETCH_INVENTORIES_REQUESTING
  ) return
  dispatch({type: FETCH_INVENTORIES_REQUESTING});

  try {
    const json = await inventoryAPI.list();
    const normalizedData = await normalize(json.data.data, arrayOfInventories)
    let data = normalizedData.entities.inventories;
    if(typeof data === 'undefined') data = {};
    console.log(data)
    dispatch({type: FETCH_INVENTORIES_SUCCESS, data: data})
  } catch (err) {
    dispatch({type: FETCH_INVENTORIES_FAILURE, data: data})
  }
};

export const getInventory = (pid) => async (
  dispatch,
  getState,
  apiEngine
) => {
  let oneInventory = getState().oneInventory;
  if(pid in oneInventory &&
    (oneInventory[pid].readyStatus === FETCH_ONE_INVENTORY_SUCCESS ||
      oneInventory[pid].readyStatus ===  FETCH_ONE_INVENTORY_REQUESTING)
  ) return;



  dispatch({type: FETCH_ONE_INVENTORY_REQUESTING, pid: pid})
  try {
    const json = await inventoryAPI.get(pid);

    dispatch({type: FETCH_ONE_INVENTORY_SUCCESS, pid: pid, data: json.data.data});
    return json.data.data
  } catch (err) {
    dispatch({type: FETCH_ONE_INVENTORY_FAILURE, pid: pid, err: err})
  }
};


export const resetEditInventories = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  const originalData = getState().inventories.data
};
