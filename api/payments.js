export default apiEngine => ({
  charge: data => {
    return apiEngine.post('/api/payment/subscribe', { data })
  },
});