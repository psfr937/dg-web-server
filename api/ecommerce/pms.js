import apiEngine from "../apiEngine";
import { GET, POST } from "../methods";

export default {
  list: () => {
    return apiEngine(GET, `/pms`)
  },
  addPaymentMethod: data => {
    return apiEngine(POST, '/pms/add', { data })
  },
};