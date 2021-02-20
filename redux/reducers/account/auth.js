export const SAVE_COOKIE = 'SAVE_COOKIE';
export const REMOVE_COOKIE = 'REMOVE_COOKIE';
export const AUTHENTICATE = 'AUTHENTICATE';
export const DEAUTHENTICATE = 'DEAUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const LOGIN_WITH_FACEBOOK = 'LOGIN_WITH_FACEBOOK';
export const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE';
export const VERIFY_EMAIL = 'VERIFY_EMAIL';

const initialState = {
  token: null,
  info: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SAVE_COOKIE:
      return {
        token: action.payload.token,
        info: action.payload.info
      };
    case REMOVE_COOKIE:
      return { token: null, info: null };
    default:
      return state;
  }
};