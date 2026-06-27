const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const enrollInCourse = asyncHandler(async (req, res) => {
  // TODO: for free courses - direct enrollment
  // TODO: for paid courses - check payment record first
  return successResponse(res, {}, "Enrolled successfully", 201);
});

const getMyEnrollments = asyncHandler(async (req, res) => {
  // TODO: return all courses student is enrolled in
  return successResponse(res, []);
});

const getEnrolledStudents = asyncHandler(async (req, res) => {
  // TODO: teacher - get students enrolled in their course
  return successResponse(res, []);
});

module.exports = { enrollInCourse, getMyEnrollments, getEnrolledStudents };
