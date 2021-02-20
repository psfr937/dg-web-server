import apiEngine from "./apiEngine";
import { POST } from "./methods"

export default {
  purchase: data => {
    return apiEngine(POST,'/api/cart/purchase', { data })
  },
  createPaymentIntent: data => {
    return apiEngine(POST, '/api/payment/create-payment-intent', { data })
  },
};