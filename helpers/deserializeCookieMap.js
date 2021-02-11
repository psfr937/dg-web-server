const mapValues = require('lodash/mapValues');

function deserializeCookie (cookieValue){
  try {
    const parsed = JSON.parse(cookieValue);
    return parsed;
  } catch (err) {
    return cookieValue;
  }
}

module.exports = cookieMap => mapValues(cookieMap, deserializeCookie);
