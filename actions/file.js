const fsExtra = require('fs-extra')
const { replaceAll } = require('../utils/clb')
const cloudPath = `${__dirname}/../data`

module.exports = [
  {
    id: 'file',
    type: 'get',
    callback: (req, res) => {
      var { path } = req.query
      path = replaceAll(path, '../')

      try {
        res.download(`${cloudPath}/${req.user.username}/${path}`)
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }
    },
  },
  {
    id: 'file',
    type: 'post',
    callback: (req, res) => {
      var { path } = req.body
      path = replaceAll(path, '../')//TODO: Resolve path

      try {
        let files = Object.keys(req.files).map(k => req.files[k])
        files = files instanceof Array ? files : [ files ]
  
        files.forEach(file => 
          file.mv(`${cloudPath}/${req.user.username}/${file.name}`)
        )

        res.status(200).send('Ok')
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }
    }
  },
  {
    id: 'file',
    type: 'delete',
    callback: (req, res) => {
      var { path } = req.body
      path = replaceAll(path, '../')

      try {
        fsExtra.removeSync(`${cloudPath}/${req.user.username}/${path}`)
        res.status(200).send('Ok')
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }    
    },
  },
]