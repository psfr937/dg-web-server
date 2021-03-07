import apiEngine from "./apiEngine";
import { POST, GET } from "./methods"

export default {
  list: () => {
    return apiEngine(GET, `/api/staffs`)
  },
  update: (data)=> {
    return apiEngine(POST, '/api/staffs', {
      data
    })
  }
};