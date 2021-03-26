const model = require('mongoose').model

module.exports = model('Rank', {
  id: Number,
  name: String,
})