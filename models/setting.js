const Schema = require('mongoose').Schema

module.exports = new Schema({
  username: String,
  profile_picture: String,
  is_subscribed: Boolean,
  rank_id: Number,
  max_folder_size: Number,//0 Is unlimited the size is in MB
})