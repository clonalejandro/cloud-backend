const fs = require('fs')
const fsExtra = require('fs-extra')
const { replaceAll } = require('../utils/clb')
const cloudPath = `${__dirname}/../data`

module.exports = [
  {
    id: 'dir',
    type: 'get',
    callback: (req, res) => {
      var { path } = req.body

      path = replaceAll(path, '../')

      try {
        res.send(fs.readdirSync(path).map(e => ({
          name: e,
          type: fs.statSync(`${path}/${e}`).isDirectory ? 'folder' : 'file',
        })))
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }
    },
  },
  {
    id: 'dir',
    type: 'post',
    callback: (req, res) => {
      const { username } = req.body.user
      var { path } = req.body

      path = replaceAll(path, '../')

      try {
        fs.mkdirSync(`${cloudPath}/${username}/${path}`)
        res.status(200).send('Ok')
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }
    },
  },
  {
    id: 'dir',
    type: 'put',
    callback: (req, res) => {
      var { currentDir } = req.body
      var { newDir } = req.body

      currentDir = replaceAll(currentDir, '../')
      newDir = replaceAll(newDir, '../')

      try {
        fs.renameSync(currentDir, newDir)
        res.status(200).send('Ok')
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }
    },
  },
  {
    id: 'dir',
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
    }
  },
]