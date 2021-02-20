import {apiUrl} from "../config";

const protocol = process.env.NODE_ENV === 'development'
? 'http' : 'https'
export default (path, query = null) => {

  let queryString = '';

  if(query){
    Object.keys(query).map( (k, i) => {
      queryString += (i === 0)?'?':'&';
      queryString += `${k}=${query[k]}`
    })
  }
  console.log(apiUrl)
  return `${protocol}://${apiUrl}${path}${queryString}`
};