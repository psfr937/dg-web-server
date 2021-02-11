import {
  TOGGLE_LOGIN_BOX,
  CLOSE_LOGIN_BOX,
  TOGGLE_SIDE_BAR,
  SET_PROFILE_ACTIVE, SET_RIGHT_PAGE, SET_COMMENT_PAGE_ACTIVE
} from "../reducers/ux";

import pageNames from '../../constants/PageNames'
export const toggleSideBar = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  if(!getState().ux.sideBarActive){
    dispatch({type: SET_RIGHT_PAGE, mainPage: pageNames.ISSUE_LIST })
  }
  dispatch({ type: TOGGLE_SIDE_BAR });
}

export const setMainPage = page => async (
  dispatch,
  getState,
  apiEngine
) => {
  dispatch({type: SET_RIGHT_PAGE, mainPage: page })
  //console.log(getState().ux)
}

export const setCommentPageActive = value => async (
  dispatch,
  getState,
  apiEngine
) => {
  dispatch({type: SET_COMMENT_PAGE_ACTIVE, value })
}

export const setProfileActive = (value) => async (
  dispatch,
  getState,
  apiEngine
) => {
  dispatch({ type: SET_PROFILE_ACTIVE, value: value });
}


export const toggleLoginBox = (page) => async (
  dispatch,
  getState,
  apiEngine
) => {
  dispatch({ type: TOGGLE_LOGIN_BOX, page: page });
};
export const closeLoginBox = () => async (
  dispatch,
  getState,
  apiEngine
) => {
  dispatch({ type: CLOSE_LOGIN_BOX });
};
