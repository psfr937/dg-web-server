export const SET_PICKUP_TIME = 'SET_PICKUP_TIME';

const time = new Date();
time.setDate(time.getDate() + 2);
time.setHours(6);
time.setMinutes(0);
time.setMilliseconds(0);

const initialState = {
  year: time.getFullYear(), month: time.getMonth() + 1, date: time.getDate(),
  hours: time.getHours(), minutes: time.getMinutes()
};

export default (state, action) => {

  if(typeof state === 'undefined'){
    state = initialState
  }

  switch (action.type) {
    case SET_PICKUP_TIME:
      return state;
    default:
      return state
  }
};
