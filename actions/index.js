const user = require('./user')
const file = require('./file')
const dir  = require('./dir')

module.exports = [
  ...user,
  ...file,
  ...dir,
]