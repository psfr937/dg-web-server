import submitAnswer from "../redux/reducers/submitAnswer";

export default apiEngine => ({
  submitAnswer: data => apiEngine.post('/api/submitAnswer', {data: data})
})