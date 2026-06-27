const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const getMyNotifications = asyncHandler(async (req, res) => {
  // TODO: return notifications for logged-in user
  return successResponse(res, []);
});

module.exports = { getMyNotifications };
