export const AUTHENTICATE = 'AUTHENTICATE';
export const DEAUTHENTICATE = 'DEAUTHENTICATE';

const initialState = {
  token: null,
  info: null
};

export default (state = initialState, action) => {
  switch(action.type) {
    case AUTHENTICATE:
      return {
        token: action.payload.token,
        info: action.payload.info
      };
    case DEAUTHENTICATE:
      return { token: null, info: null };
    default:
      return state;
  }
};