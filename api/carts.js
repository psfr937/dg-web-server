import apiEngine from "./apiEngine";
import { POST, GET } from "./methods"

export default {
  purchase: data => {
    return apiEngine(POST,'/cart/purchase', { data })
  },
  list: data => {
    return apiEngine(POST, '/cart', { data })
  },
  createPaymentIntent: data => {
    return apiEngine(POST, '/payment/create-payment-intent', { data })
  },
  createSetupIntent: data => {
    return apiEngine(POST, '/payment/create-setup-intent')
  }
};