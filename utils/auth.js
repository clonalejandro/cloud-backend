const passport = require('passport')
const bCrypt = require('bcrypt-nodejs')

const encrypt = word => bCrypt.hashSync(word, bCrypt.genSaltSync(10), null)

module.exports = {
  useAuth: (server, secret) => {
    server.use(expressSession({
      secret,
    }))
    server.use(passport.initialize())
    server.use(passport.session());
  },

}