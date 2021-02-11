export default apiEngine => ({
  list: () => {
    return apiEngine.get(`/api/plans`)
  }
});