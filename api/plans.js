import { GET, POST } from './methods'
import apiEngine from "./apiEngine";

export default {
  list: () => {
    return apiEngine(GET, `/api/plans`)
  },
  subscribe: data => {
    return apiEngine(POST, '/api/plans/subscribe', { data })
  },
};