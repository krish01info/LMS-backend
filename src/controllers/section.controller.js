const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const createSection = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Section created", 201);
});
const updateSection = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Section updated");
});
const deleteSection = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Section deleted");
});
const reorderSections = asyncHandler(async (req, res) => {
  // TODO: update order field for multiple sections
  return successResponse(res, {}, "Sections reordered");
});
module.exports = { createSection, updateSection, deleteSection, reorderSections };
