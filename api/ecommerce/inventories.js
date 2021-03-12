import { GET, POST } from '../methods'
import apiEngine from '../apiEngine'


export default {
  list: ({ data }) => {
    return apiEngine(POST, `/inventories/list`, { data })
  },
  get: (pid) => {
     return apiEngine(GET, `/inventories/${pid}`)
   },
  serverGet: (pid, ctx) => {

    return apiEngine(GET, `/inventories/${pid}`, { ctx })
  }
}

// export default apiEngine => ({
//   list: () => {
//     return apiEngine(GET, `/inventories`)
//   },
//   get: pid => {
//     return apiEngine(GET, `/inventories/${pid}`)
//   }
// });