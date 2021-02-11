import fp from 'lodash/fp';


export const TOGGLE_LOGIN_BOX='TOGGLE_LOGIN_BOX'
export const CLOSE_LOGIN_BOX='CLOSE_LOGIN_BOX'
export const TOGGLE_SIDE_BAR='TOGGLE_SIDE_BAR'
export const SET_PROFILE_ACTIVE='SET_PROFILE_OPTION_ACTIVE'
export const SET_RIGHT_PAGE ='SET_RIGHT_PAGE'
export const SET_COMMENT_PAGE_ACTIVE='SET_COMMENT_PAGE_ACTIVE'
export const SET_AUTH_BOX_PAGE='SET_AUTH_BOX_PAGE'
export const OPEN_AUTH_BOX='OPEN_AUTH_BOX'
export const SET_READ_ONLY='SET_READ_ONLY'
export const SET_WEB_EDIT_MODE='SET_WEB_EDIT_MODE'
export const SELECT_WEB_COMPONENT='SELECT_WEB_COMPONENT'

import pageNames from '../../constants/PageNames'

const initialState = {
  authBoxActive: false,
  authBoxPage: 'register',
  commentPageActive: false,
  profileActive: false,
  sideBarActive: false,
  mainPage: pageNames.TOOL,
  sidePage: pageNames.TRENDING_LIST,
  toolPage: pageNames.T_GOAL_LIST,
  readOnly: {
    clientList: true,
    serviceList: true,
    staffList: true,
    visitList: true,
    productList: true,
    webItem: true
  },
  selectedWebEditComponent: {
    componentType: null,
    nthOfType: null
  }
};

export default (state = initialState, action)=> {
  // console.log(state)
  switch (action.type) {
    case OPEN_AUTH_BOX:
      return fp.assign(state, {
        authBoxActive: true
      });
    case TOGGLE_LOGIN_BOX:
      return fp.assign(state, {
        authBoxActive: !state.authBoxActive
      });
    case SET_AUTH_BOX_PAGE:
      return fp.assign(state, {
        authBoxPage: action.page
      });
    case CLOSE_LOGIN_BOX:
      return fp.assign(state, {
        authBoxActive: false
      });
    case TOGGLE_SIDE_BAR:
      return fp.assign(state, {
        sideBarActive: !state.sideBarActive
      });
    case SET_PROFILE_ACTIVE:
      return fp.assign(state, {
        profileActive: action.value
      });
    case SET_COMMENT_PAGE_ACTIVE:
      return fp.assign(state, {
        commentPageActive: action.value
      });
    case SET_RIGHT_PAGE:
      return fp.assign(state, {
        mainPage: action.mainPage
      });
    case SET_WEB_EDIT_MODE:
      return fp.assign(state, {
        webEditMode: action.webEditMode
      })
    case SET_READ_ONLY:
      console.log(action.value)
      console.log( fp.assign(state, {
        readOnly: {
          [action.listName]: action.value
        }
      }))
      return {...state,
        readOnly: {...state.readOnly,
          [action.listName]: action.value
        }
      }
    case SELECT_WEB_COMPONENT:
      return { ...state,
        selectedWebEditComponent: {
          componentType: action.class,
          nthOfType: action.id,
        }
      }
    default:
      return state;
  }
};
