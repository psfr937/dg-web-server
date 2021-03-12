import apiEngine from "../apiEngine";
import { POST } from "../methods"

export default {
  buy: ({data})  => {
    return apiEngine(POST, '/transaction/buy', { data })
  },
  sell: ({data}) => {
    return apiEngine(POST, '/transaction/sell', { data })
  },
  addPm: ({data}) => {
    return apiEngine(POST, '/transaction/add-payment-method', { data })
  },
};