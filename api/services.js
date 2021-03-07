import apiEngine from "./apiEngine";
import { POST, GET } from "./methods"

export default {
  list: () => {
    return apiEngine(GET, `/api/services`)
  },
  update: files => {
    return apiEngine(POST, '/api/services', {
      files
    })
  },
};