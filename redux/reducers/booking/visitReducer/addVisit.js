import fp from "lodash/fp";

export const SET_VISIT_FORM_VALUE = 'SET_VISIT_FORM_VALUE'
export const SET_VISIT_ATTACHMENT = 'SET_VISIT_ATTACHMENT'

const initState = {
  title: '',
  body: '',
  tags: [],
  attachment: {
    pictures: [],
    files: [],
    fileErrors: []
  },
}

export default (state = initState, action) => {
  // console.log(action)
  switch(action.type) {
    case SET_VISIT_FORM_VALUE:
      return {
        ...state,
        [action.name]: action.value
      }
    case SET_VISIT_ATTACHMENT:
      return {
        ...state,
        attachment: {
          ...state.attachment, ...action.value
        }
      }
    default:
      return state
  }
};
