const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  tenderId: Number,
  companyName: String,
  bidCost: Number,
  bidTime: {
    type: Date,
    default: Date.now,
  },
  last5MinuteFlag: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true, 
});

module.exports = mongoose.model('Bid', bidSchema);
