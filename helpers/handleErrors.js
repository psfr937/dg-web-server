export const CONNECTION_ERROR = 'CONNECTION_ERROR';
export const SERVER_ERROR = 'SERVER_ERROR';

export default err => {

  if(typeof err.response !== 'undefined'){
    console.log(err.response);
    console.log(err.response.data);
    return {
      type: SERVER_ERROR,
      data: err.response.data
    }
  }
  else{
    return {
      type: CONNECTION_ERROR,
      data: err.code
    }
  }
}