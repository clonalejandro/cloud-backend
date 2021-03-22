const Schema = require('mongoose').Schema

module.exports = new Schema({
  email: String,
  username: String,
  password: String,
  creation_date: Date,
  last_connection_date: Date,
  last_connection_ip: String,
})