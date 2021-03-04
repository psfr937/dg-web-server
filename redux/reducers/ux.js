import fp from 'lodash/fp';


export const TOGGLE_ADDRESS_BOX='TOGGLE_ADDRESS_BOX';

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
  addressBoxActive: false,
  selectedWebEditComponent: {
    componentType: null,
    nthOfType: null
  }
};

export default (state = initialState, action)=> {
  // console.log(state)
  switch (action.type) {
    case TOGGLE_ADDRESS_BOX:
      return { ...state, addressBoxActive: action.data }
    default:
      return state;
  }
};
