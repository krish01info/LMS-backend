const { errorResponse } = require("../utils/response");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return errorResponse(res, message, statusCode);
};

const notFound = (req, res, next) => {
  return errorResponse(res, `Route ${req.originalUrl} not found`, 404);
};

module.exports = { errorHandler, notFound };
