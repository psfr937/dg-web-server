export default apiEngine => ({
  purchase: data => {
    return apiEngine.post('/api/cart/purchase', { data })
  },
  createPaymentIntent: data => {
    return apiEngine.post('/api/payment/create-payment-intent', { data })
  },
});