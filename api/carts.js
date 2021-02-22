import apiEngine from "./apiEngine";
import { POST, GET } from "./methods"

export default {
  purchase: data => {
    return apiEngine(POST,'/api/cart/purchase', { data })
  },
  list: data => {
    return apiEngine(POST, '/api/cart', { data })
  },
  createPaymentIntent: data => {
    return apiEngine(POST, '/api/payment/create-payment-intent', { data })
  }

};