const { z } = require('zod');

// Define Zod schema for Tender validation
const tenderSchema = z.object({
  name: z.string().min(3, "Tender name must be at least 3 characters long"),
  description: z.string().min(10, "Tender description must be at least 10 characters long"),
  startTime: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid start time format"),
  endTime: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid end time format"),
  bufferTime: z.string().min(1, "Buffer time must be at least 1 minute").optional(),
});

module.exports = tenderSchema;
