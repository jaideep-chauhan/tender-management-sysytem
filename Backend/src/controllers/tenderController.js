const { ZodError } = require('zod');
const Tender = require('../models/Tender');
const tenderSchema = require('../schemas/tenderValidation');
const { StatusCodes } = require('http-status-codes');
const { notifyTenderUpdate } = require('../utils/socketUtils');

// Create a tender
exports.createTender = async (req, res) => {
  try {
    // Validate the input data using Zod
    console.log(req.body);
    const parsedData = tenderSchema.parse(req.body);

    const { name, description, startTime, endTime, bufferTime } = parsedData;

    const tender = await Tender.create({
      name,
      description,
      startTime,
      endTime,
      bufferTime,
    });

    // Notify clients about the new tender
    notifyTenderUpdate({
      tenderId: tender.tenderId,
      message: `A new tender has been created: ${tender.name}`,
    });

    res.status(StatusCodes.CREATED).json({ success: true, data: tender });
  } catch (error) {
    if (error instanceof ZodError) {
      // Return validation errors from Zod
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        errors: error.errors.map((err) => err.message),
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
  }
};

// Get all tenders
exports.getTenders = async (req, res) => {
  try {
    const tenders = await Tender.find();
    res.status(StatusCodes.OK).json({ success: true, data: tenders });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server error', error });
  }
};
