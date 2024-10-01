const { ZodError } = require('zod');
const { StatusCodes } = require('http-status-codes');

const errorMiddleware = (err, req, res, next) => {
  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      errors: err.errors.map(error => error.message),
    });
  }

  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || 'Server Error',
  });
};

module.exports = errorMiddleware;
