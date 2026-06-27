const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const createDomain = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Domain created", 201);
});
const getAllDomains = asyncHandler(async (req, res) => {
  return successResponse(res, []);
});
const updateDomain = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Domain updated");
});
const deleteDomain = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Domain deleted");
});
const assignTeacherToDomain = asyncHandler(async (req, res) => {
  // TODO: add domain to teacher's TeacherProfile domains
  return successResponse(res, {}, "Teacher assigned to domain");
});
module.exports = { createDomain, getAllDomains, updateDomain, deleteDomain, assignTeacherToDomain };
