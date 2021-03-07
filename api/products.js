import apiEngine from "./apiEngine";
import { POST, GET } from "./methods"

export default {
  list: () => {
    return apiEngine(GET, `/api/products`)
  },
  update: files => {
    return apiEngine(POST, '/api/products', {
      files
    })
  },
};