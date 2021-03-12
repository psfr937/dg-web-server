import apiEngine from "../apiEngine";
import {GET, POST} from "../methods";

export default {
  list: () => apiEngine(GET, '/addresses'),
  add: ({data}) => apiEngine(POST, '/address', { data })
}