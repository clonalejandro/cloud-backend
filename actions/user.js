const { User } = require('../models')
const fsExtra = require('fs-extra')
const user = require('../models/user')
const cloudPath = `${__dirname}/../data`

module.exports = [
  {
    id: 'user',
    type: 'get',
    callback: (req, res) => {
      const { user } = req
      res.send(user)
    },
  },
  {
    id: 'user',
    type: 'put',
    callback: (req, res) => {
      const { username } = req.body
      User.findOne({username}, (err, usr) => {
        if (err) res.status(500).send(err.message)
        else if (!usr){
          User.findByIdAndUpdate(req.user._id, { username },
            (err, r) => {
              if (err){
                console.error(err)
                res.status(500).send(err.message)
              }
              else res.status(200).send('Ok')
            }
          )
        }
        else res.status(500).send('This username al ready exists!')
      })
    }
  },
  {
    id: 'user',
    type: 'delete',
    callback: (req, res) => {
      const { username } = req.user
      User.deleteOne({ username }, (err, r) => {
        if (err){
          console.error(err)
          res.status(500).send(err.message)
        }
        else {
          fsExtra.removeSync(`${cloudPath}/${username}`)
          res.redirect('/logout')
        }
      })
    },
  },
]