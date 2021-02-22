import apiEngine from "./apiEngine";
import { POST } from "./methods";

export default {
  getSellQuotation: ({data}) => apiEngine(POST, '/api/delivery/get-send-out-quotation', {data}),
  getBuyQuotation: ({data}) => apiEngine(POST, '/api/delivery/get-buy-quotation', {data}),
}