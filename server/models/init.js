const mongoose = require('mongoose')

// Use the Promise functionality built into Node.js
mongoose.Promise = global.Promise

// Connect to our local database
const db = mongoose
  .connect(`${process.env.MONGODB_URI}mydb`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => {
    console.log('Successfully connected to mydb')
  })
  .catch(error => {
    //   If there was an error connecting to the database
    if (error) console.error('Error connecting to MongoDB database', error)
  })

// Connect to our local database
const kentelioù = mongoose
  .createConnection(`${process.env.MONGODB_URI}kentelioù`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => {
    console.log('Successfully connected to kentelioù')
  })
  .catch(error => {
    //   If there was an error connecting to the database
    if (error) console.error('Error connecting to kentelioù MongoDB database', error)
  })

module.exports = {
  db,
  kentelioù,
  mongoose
}
