import apiEngine from "./apiEngine";
import { GET, POST } from "./methods";

export default {
  list: () => {
    return apiEngine(GET, `/api/pms`)
  },
  addPaymentMethod: data => {
    return apiEngine(POST, '/api/pms/add', { data })
  },
};