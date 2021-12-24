const { mongoose } = require('./init');
const Schema = mongoose.Schema

const emailCode = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'User'
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 3600
  },
  email: {
    type: String,
    required: false
  },
  }, {timestamps: true});

const EmailCode = mongoose.model('EmailCode', emailCode)
module.exports = EmailCode;
