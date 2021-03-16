const querystring = require('querystring');
import { POST, GET } from '../methods'
import apiEngine from "../apiEngine";

export default {
  list: () => {
    return apiEngine(GET, '/users')
  }
};