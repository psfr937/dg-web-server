import apiEngine from "../apiEngine";
import { POST, GET } from "../methods"

export default {
  list: data => {
    return apiEngine(POST, '/wishlist', { data })
  },
  add: data => {
    return apiEngine(POST, '/wishlist/add', { data })
  },
  remove: data => {
    return apiEngine(POST, '/wishlist/remove', { data })
  }
};