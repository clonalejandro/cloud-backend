const { User } = require('../models')

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
      const { user } = req.body
      User.updateOne({ username: user.username }, { user },
        (err, r) => {
          if (err){
            console.error(err)
            res.status(500).send(err.message)
          }
          else res.status(200).send('Ok')
        }
      )
    }
  },
  {
    id: 'user',
    type: 'delete',
    callback: (req, res) => {
      const { username } = req.body.user
      User.deleteOne({ username }, (err, r) => {
        if (err){
          console.error(err)
          res.status(500).send(err.message)
        }
        else res.status(200).send('Ok')
      })
    },
  },
]