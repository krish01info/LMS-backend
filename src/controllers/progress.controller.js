const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const markLessonComplete = asyncHandler(async (req, res) => {
  // TODO: upsert LessonProgress record
  // TODO: recalculate and update enrollment completionPct
  return successResponse(res, {}, "Lesson marked complete");
});

const getCourseProgress = asyncHandler(async (req, res) => {
  // TODO: return completionPct + list of completed lessons for a course
  return successResponse(res, {});
});

module.exports = { markLessonComplete, getCourseProgress };
