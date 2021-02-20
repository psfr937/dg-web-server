import {FETCH_PLTS_SUCCESS} from "../reducers/plts";
import pltAPI from "../../api/plts";
import {normalize} from "normalizr";
import {arrayOfPlts} from "../../schemas";
import {pushErrors} from "./errorAction";

export const plts = () => async (
  dispatch,
  getState,
  apiEngine
) => {

  if(getState().fetchPlts.readyStatus === FETCH_PLTS_SUCCESS) return;
  try {
    const json = await pltAPI(apiEngine).list()
    const normalizedData = await normalize(json.data.data, arrayOfPlts);
    console.log(normalizedData)
    let plts = normalizedData.entities.plts
    if(typeof plts === 'undefined') plts = {}

    dispatch({type: FETCH_PLTS_SUCCESS, data: plts})
  } catch (err) {
    dispatch(pushErrors(err))
  }
};