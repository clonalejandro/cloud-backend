const fsExtra = require('fs-extra')
const { replaceAll } = require('../utils/clb')
const cloudPath = `${__dirname}/../data`

module.exports = [
  {
    id: 'file',
    type: 'get',
    callback: (req, res) => {
      var { path } = req.body
      path = replaceAll(path, '../')

      try {
        res.download(path)
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
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }
    }
  },
  {
    id: 'file',
    type: 'put',
    callback: (req, res) => {
      var { path } = req.body
      path = replaceAll(path, '../')

    }
  },
  {
    id: 'file',
    type: 'delete',
    callback: (req, res) => {
      var { path } = req.body
      path = replaceAll(path, '../')

      try {
        fsExtra.removeSync(path)
        res.status(200).send('Ok')
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }    
    },
  },
]