

export const GET_GEOLOCATION_INVALID = 'GET_GEOLOCATION_INVALID'
export const GET_GEOLOCATION_REQUESTING = 'GET_GEOLOCATION_REQUESTING'
export const GET_GEOLOCATION_SUCCESS = 'GET_GEOLOCATION_SUCCESS'
export const GET_GEOLOCATION_FAILURE = 'GET_GEOLOCATION_FAILURE'


const initialState = {
  readyStatus: GET_GEOLOCATION_INVALID,
  err: null,
  data: {
    lat: null,
    lag: null
  }
};


export default (state, action) => {
  // console.log('QUOTE reducer')
  // console.log(state)
  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case GET_GEOLOCATION_REQUESTING:
      return {
        readyStatus:  GET_GEOLOCATION_REQUESTING,
        err: null
      }
    case GET_GEOLOCATION_FAILURE:
      return {
        readyStatus:  GET_GEOLOCATION_FAILURE,
        err: action.err
      }
    case GET_GEOLOCATION_SUCCESS:
      return {
        readyStatus:  GET_GEOLOCATION_SUCCESS,
        data: action.data,
        form: cleanState
      }

    default:
      return state;
  }
};
