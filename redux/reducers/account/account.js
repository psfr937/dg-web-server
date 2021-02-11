export const SIGNIN_INVALID = 'SIGNIN_INVALID'
export const INIT_SIGNIN_REQUESTING = 'SIGNIN_REQUESTING'
export const INIT_SIGNIN_GENERAL_FAILURE = 'SIGNIN_GET_GENERAL_FAILURE'
export const INIT_SIGNIN_LOGIN_FAILURE = 'SIGNIN_FAILURE'
export const INIT_SIGNIN_GET_OTP_FAILURE = 'SIGNIN_GET_VERIFY_CODE_FAILURE'
export const INIT_SIGNIN_LOGIN_SUCCESS = 'SIGNIN_REQUESTING'
export const INIT_SIGNIN_GET_OTP_SUCCESS = 'SIGNIN_GET_VERIFY_CODE_SUCCESS'
export const OTP_SIGNIN_REQUESTING = 'SIGNIN_CHECK_CODE_REQUESTING'
export const OTP_SIGNIN_FAILURE = 'SIGNIN_FAILURE'
export const OTP_SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'


const initialState = {
  readyStatus: SIGNIN_INVALID,
  requestId: null,
  err: null
}

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SIGNIN_INVALID:
      return {...state,
        readyStatus: SIGNIN_INVALID,
      }
    case INIT_SIGNIN_REQUESTING:
      return {...state,
        readyStatus:INIT_SIGNIN_REQUESTING,
      }
    case INIT_SIGNIN_GENERAL_FAILURE:
      return {...state,
        readyStatus:  INIT_SIGNIN_GENERAL_FAILURE,
        err: action.err
      }
    case INIT_SIGNIN_LOGIN_FAILURE:
      return {...state,
        readyStatus:  INIT_SIGNIN_LOGIN_FAILURE,
        err: action.err
      }
    case INIT_SIGNIN_LOGIN_SUCCESS:
      return {...state,
        readyStatus: INIT_SIGNIN_LOGIN_SUCCESS,
      }
    case INIT_SIGNIN_GET_OTP_SUCCESS:
      return {...state,
        readyStatus:  INIT_SIGNIN_GET_OTP_SUCCESS,
        requestId: action.requestId
      }
    case INIT_SIGNIN_GET_OTP_FAILURE:
      return {...state,
        readyStatus: INIT_SIGNIN_GET_OTP_FAILURE,
        err: null
      }
    case OTP_SIGNIN_REQUESTING:
      return {...state,
        readyStatus:  OTP_SIGNIN_REQUESTING,
        err: action.err
      }
    case OTP_SIGNIN_SUCCESS:
      return {...state,
        readyStatus: OTP_SIGNIN_SUCCESS,
      }
    case OTP_SIGNIN_FAILURE:
      return {...state,
        readyStatus:  OTP_SIGNIN_FAILURE,
        err: action.err
      }
    default:
      return state;
  }
};
