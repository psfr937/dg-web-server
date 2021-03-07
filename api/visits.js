import apiEngine from "./apiEngine";
import { POST, GET } from "./methods"

export default {
  list: (id) => {
    return apiEngine(GET, `/api/clients/${id}/visits`)
  },
  listMine: () => {
    return apiEngine(GET, `/api/me/visits`)
  },
  update: (id, data,files = null)=> {
    return apiEngine(POST, `/api/clients/${id}/visits`, {
      data,
      files
    })
  },
  create: (id, data,files = null)=> {
    return apiEngine(POST, `/api/clients/${id}/visits`, {
      data,
      files
    })
  },
};