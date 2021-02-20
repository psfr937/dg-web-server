import { GET } from './methods'
import apiEngine from './apiEngine'


export default {
  list: () => {
    return apiEngine(GET, `/api/inventories`)
  },
  get: (pid) => {
     return apiEngine(GET, `/api/inventories/${pid}`)
   },
  serverGet: (pid, ctx) => {

    return apiEngine(GET, `/api/inventories/${pid}`, { ctx })
  }
}

// export default apiEngine => ({
//   list: () => {
//     return apiEngine(GET, `/api/inventories`)
//   },
//   get: pid => {
//     return apiEngine(GET, `/api/inventories/${pid}`)
//   }
// });