import apiEngine from "./apiEngine";
import { POST } from "./methods"

export default {
  createPaymentIntent: data => {
    return apiEngine(POST, '/stripe/create-payment-intent', { data })
  },
  createSetupIntent: () => {
    return apiEngine(POST, '/stripe/create-setup-intent')
  },
};