import apiEngine from "../apiEngine";
import { POST } from "../methods";

export default {
  getBuyQuotation: ({data}) => apiEngine(POST, '/quotation/buy', {data}),
  getSellQuotation: ({data}) => apiEngine(POST, '/quotation/sell', {data})
}