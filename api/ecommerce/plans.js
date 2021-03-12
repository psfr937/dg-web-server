import { GET, POST } from '../methods'
import apiEngine from "../apiEngine";

export default {
  list: () => {
    return apiEngine(GET, `/plans`)
  },
  subscribe: data => {
    return apiEngine(POST, '/plans/subscribe', { data })
  },
};