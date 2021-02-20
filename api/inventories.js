import { GET } from './methods'
import apiEngine from './apiEngine'


export default {
  list: () => {
    return apiEngine(GET, `/api/inventories`)
  },
  get: pid => {
     return apiEngine(GET, `/api/inventories/${pid}`)
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