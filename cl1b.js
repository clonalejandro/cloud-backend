const { isAuth } = require('./utils/auth')

module.exports = {
  get: (server, id, callback, isApi = true) => !isApi ? server.get(id, isAuth, callback) : server.get(`/api/${id}`, callback),
  post: (server, id, callback) => server.post(`/api/${id}`, isAuth, callback),
  put: (server, id, callback) => server.put(`/api/${id}`, isAuth, callback),
  delete: (server, id, callback) => server.delete(`/api/${id}`, isAuth, callback),
  portHook: port => console.log(`Backend is up listening the port ${port} 🎨`)
}