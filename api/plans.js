export default apiEngine => ({
  list: () => {
    return apiEngine.get(`/api/plans`)
  },
  subscribe: data => {
    return apiEngine.post('/api/plans/subscribe', { data })
  },
});