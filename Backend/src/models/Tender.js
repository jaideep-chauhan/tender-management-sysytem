const mongoose = require('mongoose');

// Helper function to generate a random 10-digit tenderId
const generateTenderId = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit number
};

const tenderSchema = new mongoose.Schema({
  tenderId: {
    type: Number,
    unique: true,
    default: generateTenderId, 
  },
  name: String,
  description: String,
  startTime: Date,
  endTime: Date,
  bufferTime: {
    type: Number,
    default: process.env.BUFFER_TIME || 5, // Default to 5 minutes buffer
  },
  lowestBid: {
    type: Number,
    default: null,
  },
},{
  timestamps: true, 
});

module.exports = mongoose.model('Tender', tenderSchema);
