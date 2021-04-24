const passport = require('passport')
const expressSession = require('express-session');
const flash = require('connect-flash')
const bCrypt = require('bcrypt-nodejs')
const { Strategy } = require('passport-local')
const { User } = require('../models')
const fsExtra = require('fs-extra')
const cloudPath = `${__dirname}/../data`

var router

const encrypt = word => bCrypt.hashSync(word, bCrypt.genSaltSync(10), null)
const isValidPwd = (usr, pwd) => bCrypt.compareSync(pwd, usr.password)

const useLogin = () => passport.use('login', new Strategy({ passReqToCallback: true, }, 
  (req, username, password, done) => {
    User.findOne({ username }, (err, usr) => {
      if (err) return done(err)
      if (!usr) return done(null, false, req.flash('message', 'User not found.'))
      if (!isValidPwd(usr, password)) return done(null, false, req.flash('message', 'Invalid password.'))
      
      return done(null, usr, req.flash('message', 'success'))
    })
  })
)

const useRegister = () => passport.use('register', new Strategy({ passReqToCallback: true, },
  (req, username, password, done) => {
    const findOrCreateUsr = () => {
      User.findOne({ username }, (err, usr) => {
        if (err) return done(err)
        if (usr) return done(null, false, req.flash('message', 'This username is already exists.'))
        
        const nUser = new User()

        nUser.email = req.param('email')
        nUser.username = username
        nUser.password = encrypt(password)
        nUser.creation_date = new Date()
        nUser.last_connection_date = new Date()

        fsExtra.mkdirSync(`${cloudPath}/${username}`)
        nUser.save(err => {
          if (err) {
            console.error(err)
            return done(err)
          }
          return done(null, nUser, req.flash('message', 'success'))
        })
      })
    }

    process.nextTick(findOrCreateUsr)
  })
)

const useLogout = () => router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).send('Ok')
})

module.exports = {
  setRouter: server => router = server,
  useAuth: () => {
    router.use(expressSession({
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true
    }))
    router.use(passport.initialize())
    router.use(passport.session())
    router.use(flash())

    passport.serializeUser((user, done) => done(null, user._id))
    passport.deserializeUser((id, done) => User.findById(id, (err, user) => done(err, user)))

    useLogin()
    useRegister()
    useLogout()

    router.post('/login', passport.authenticate('login', {failureFlash : true, failureRedirect: '/login', successRedirect: '/login',}))
    router.post('/register', passport.authenticate('register', {failureFlash : true, failureRedirect: '/register', successRedirect: '/register',}))

    const routes = ['login', 'register']
    routes.forEach(e => 
      router.get(`/${e}`, (req, res) => {
        const message = req.flash('message')[0]
        if (message.toLowerCase() === 'ok' || message.toLowerCase() === 'success')
          res.status(200).send(message)
        else res.status(500).send(message)
      })
    )
  },
  isAuth: (req, res, next) => {
    if (req.isAuthenticated())
      return next()
    res.status(403).send('Forbidden')
  },
}