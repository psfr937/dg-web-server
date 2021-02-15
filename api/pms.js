export default apiEngine => ({
  list: () => {
    return apiEngine.get(`/api/pms`)
  },
  addPaymentMethod: data => {
    return apiEngine.post('/api/pms/add', { data })
  },
});