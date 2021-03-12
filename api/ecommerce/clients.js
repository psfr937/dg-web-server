import apiEngine from "../apiEngine";
import { POST, GET } from "../methods"

export default {
  list: () => {
    return apiEngine(GET, `/api/clients`)
  },
  update: (data,files = null)=> {
    return apiEngine(POST, '/api/clients', {
      data,
      files
    })
  }

};