import apiEngine from "../apiEngine";
import { POST, GET } from "../methods"

export default {
  list: data => {
    return apiEngine(GET, '/wishes')
  },
  guestList: data => {
    return apiEngine(POST, '/wishes/guest', { data })
  },
  add: data => {
    return apiEngine(GET, '/wishes/add', { data })
  },
  remove: data => {
    return apiEngine(GET, '/wishes/remove', { data })
  }
};