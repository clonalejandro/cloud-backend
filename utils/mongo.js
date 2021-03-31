const mongoose = require('mongoose')

module.exports = {
  connect_mongo: async uri => {
    return await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }).
    then(() => console.log('MongoDB connected! 💾'))
    .catch(err => {
      console.error(`MongoDB ❌💾: ${err.message}`)
      process.exit(err.code)
    })
  },
}