

export const SAVE_ADDRESS_INVALID = 'SAVE_ADDRESS_INVALID'
export const SAVE_ADDRESS_REQUESTING = 'SAVE_ADDRESS_REQUESTING'
export const SAVE_ADDRESS_SUCCESS = 'SAVE_ADDRESS_SUCCESS'
export const SAVE_ADDRESS_FAILURE = 'SAVE_ADDRESS_FAILURE'

const cleanState = {
  lineOne: '',
  lineTwo: '',
  city: '',
  zip: '',
  state: '',
  country: ''
}

const initialState = {
  readyStatus: SAVE_ADDRESS_INVALID,
  err: null,
  data: null,
  form: cleanState,
  geolocation: {
    lat: null,
    lag: null
  }
}


export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SAVE_ADDRESS_REQUESTING:
      return {
        readyStatus:  SAVE_ADDRESS_REQUESTING,
        err: null
      }
    case SAVE_ADDRESS_FAILURE:
      return {
        readyStatus:  SAVE_ADDRESS_FAILURE,
        err: action.err
      }
    case SAVE_ADDRESS_SUCCESS:
      return {
        readyStatus:  SAVE_ADDRESS_SUCCESS,
        data: action.data,
        form: cleanState
      }

    default:
      return state;
  }
};
