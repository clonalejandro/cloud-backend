const model = require('mongoose').model

module.exports = model('User', {
  email: String,
  username: String,
  password: String,
  creation_date: Date,
  last_connection_date: Date,
})