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
      //TODO: update User
    }
  },
  {
    id: 'user',
    type: 'delete',
    callback: (req, res) => {
      //TODO: delete User
    },
  },
]