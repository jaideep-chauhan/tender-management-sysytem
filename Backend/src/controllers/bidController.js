const Bid = require('../models/Bid');
const Tender = require('../models/Tender');
const bidSchema = require('../schemas/bidValidation');
const { StatusCodes } = require('http-status-codes');
const { notifyNewBid, notifyTenderUpdate } = require('../utils/socketUtils');
const { ZodError } = require('zod');

// Create a bid
exports.createBid = async (req, res) => {
  try {
    const parsedData = bidSchema.parse(req.body);
    const { tenderId, companyName, bidCost } = parsedData;

    const tender = await Tender.findOne({ tenderId: tenderId });
    if (!tender) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Tender not found' });
    }

    const isLast5Minutes = (tender.endTime - Date.now()) <= 5 * 60 * 1000;

    const bid = await Bid.create({
      tenderId,
      companyName,
      bidCost,
      last5MinuteFlag: isLast5Minutes,
    });

    // Update the lowestBid if the current bidCost is lower
    if (tender.lowestBid === null || bidCost < tender.lowestBid) {
      tender.lowestBid = bidCost;
      await tender.save();
      console.log("ipdated tender", tender)
    }

    // Extend the tender end time if the bid is placed in the last 5 minutes
    if (isLast5Minutes) {
      tender.endTime = new Date(tender.endTime.getTime() + tender.bufferTime * 60 * 1000);
      await tender.save();

      // Notify about the tender update
      notifyTenderUpdate({
        tenderId: tender.tenderId,
        message: `Tender end time extended by ${tender.bufferTime} minutes.`,
        newEndTime: tender.endTime,
      });
    }

    return res.status(StatusCodes.CREATED).json({ success: true, data: bid });

  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        errors: error.errors.map(err => err.message),
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
  }
};


// Get all bids 
exports.getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find().sort({ bidCost: 1 });;
    if (!bids.length) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'No bids found' });
    }

    return res.status(StatusCodes.OK).json({ success: true, data: bids });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
  }
};
