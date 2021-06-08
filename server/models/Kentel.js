const { kentelioù, mongoose} = require('./init');
const Schema = mongoose.Schema

var kentel = new Schema({
    titl: String,
    geriaoueg: {
      titl: String,
      danvez: [{
        deroù: String, // Number
        komz: String
      }]
    },
    geriaoueg: {
      titl: String,
      danvez: String
    },
  },
  {timestamps: true}
);

var Kentel = kentelioù.model('Kentel', kentel)
module.exports = Kentel;
