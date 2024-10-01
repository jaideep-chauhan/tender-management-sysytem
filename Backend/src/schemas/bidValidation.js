const { z } = require('zod');

// Define Zod schema for Bid validation
const bidSchema = z.object({
  tenderId: z.number().min(1, "Tender ID is required"),
  companyName: z.string().min(3, "Company name must be at least 3 characters long"),
  bidCost: z.string().min(1, "Bid cost must be at least 1"),
});

module.exports = bidSchema;
