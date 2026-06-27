const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const createCategory = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Category created", 201);
});
const getCategoriesByDomain = asyncHandler(async (req, res) => {
  return successResponse(res, []);
});
const updateCategory = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Category updated");
});
const deleteCategory = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Category deleted");
});
module.exports = { createCategory, getCategoriesByDomain, updateCategory, deleteCategory };
