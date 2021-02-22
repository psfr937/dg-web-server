import apiEngine from "./apiEngine";
import {GET, POST} from "./methods";

export default {
  list: ({page}) => apiEngine(GET, '/api/address'),
  add: ({data}) => apiEngine(POST, '/api/address', { data })
}