import {
  FETCH_DETAIL_INFO_FAILURE,
  FETCH_DETAIL_INFO_SUCCESS,
  FETCH_DETAIL_INFO_REQUESTING,
} from "../../reducers/account/me";

import userAPI from '../../../api/user';

export const fetchUser = () => async (dispatch, getState, apiEngine) => {
  dispatch({ type: FETCH_DETAIL_INFO_REQUESTING });
  try {
    // console.log(chalk.green('actions/account/me line 13') + JSON.stringify(getState().auth))
    const json = await userAPI(apiEngine).readSelf();
    //  console.log('fetch user json data')
    //   console.log(json)
    if(typeof window === 'object'){
      dispatch(fetchUserSuccess(json.data.data))
    }
    else {
      return { data: json.data.data }
    }
  } catch (err) {
    if(typeof window === 'object'){
      dispatch( fetchUserFailure(err.message))
    }
    else {
      throw { err: err.message }
    }
  }
};

export const fetchUserSuccess = data => async (dispatch, getState, apiEngine) => {
  dispatch({ type: FETCH_DETAIL_INFO_SUCCESS, data })
}
export const fetchUserFailure = err => async (dispatch, getState, apiEngine) => {
  dispatch({ type: FETCH_DETAIL_INFO_FAILURE, err: err.message })
}

const shouldFetchUser = (
  dispatch, state
) => {
  // On development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (process.env.NODE_ENV !== 'production') return true;

  const me = state.me;
  // Fetching data once on production
  return me && me.detailProfileInfo !== FETCH_DETAIL_INFO_SUCCESS;
};
/* istanbul ignore next */
export const fetchUserIfNeeded = () => (
  dispatch,
  getState
) => {
  if (shouldFetchUser(getState())) {
    return dispatch(fetchUser());
  }
  return null;
};