export default apiEngine => ({
  list: () => {
    return apiEngine.get(`/api/questions`)
  },
  update: files => {
    return apiEngine.post('/api/questions', {
      files
    })
  },
});