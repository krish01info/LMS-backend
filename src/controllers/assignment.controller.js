const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const createAssignment = asyncHandler(async (req, res) => {
  // TODO: teacher creates assignment for a course
  return successResponse(res, {}, "Assignment created", 201);
});

const getAssignmentsByCourse = asyncHandler(async (req, res) => {
  // TODO: get assignments for a course
  return successResponse(res, []);
});

const submitAssignment = asyncHandler(async (req, res) => {
  // TODO: student submits (file upload via Supabase Storage or text)
  return successResponse(res, {}, "Submitted successfully");
});

const gradeSubmission = asyncHandler(async (req, res) => {
  // TODO: teacher grades, sends email notification
  return successResponse(res, {}, "Graded successfully");
});

const getSubmissions = asyncHandler(async (req, res) => {
  // TODO: teacher gets all submissions for an assignment
  return successResponse(res, []);
});

module.exports = { createAssignment, getAssignmentsByCourse, submitAssignment, gradeSubmission, getSubmissions };
