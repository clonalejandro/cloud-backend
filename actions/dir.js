const fs = require('fs')
const fsExtra = require('fs-extra')
const { replaceAll } = require('../utils/clb')
const cloudPath = `${__dirname}/../data`

module.exports = [
  {
    id: 'dir',
    type: 'get',
    callback: (req, res) => {
      const bannedFiles = process.env.BANNED_FILES.split(',')
      var { path } = req.query

      path = replaceAll(path, '../')
      path = `${cloudPath}/${req.user.username}/${path}`

      try {
        res.send(fs.readdirSync(path)
          .filter(e => !bannedFiles.includes(e.toUpperCase()))
          .map(e => ({
            name: e,
            type: fs.statSync(`${path}/${e}`).isDirectory() ? 'folder' : 'file',
          }))
        )
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
      const { username } = req.user
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
      var { current_dir } = req.body
      var { new_dir } = req.body

      current_dir = `${cloudPath}/${req.user.username}/${replaceAll(current_dir, '../')}`
      new_dir = `${cloudPath}/${req.user.username}/${replaceAll(new_dir, '../')}`

      try {
        fs.renameSync(current_dir, new_dir)
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
        fsExtra.removeSync(`${cloudPath}/${req.user.username}/${path}`)
        res.status(200).send('Ok')
      }
      catch (err){
        console.error(err)
        res.status(500).send(err.message)
      }
    }
  },
]