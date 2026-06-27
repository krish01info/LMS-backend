const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const createLesson = asyncHandler(async (req, res) => {
  // TODO: if VIDEO - get Bunny.net upload URL
  // TODO: if PDF/RESOURCE - upload to Supabase Storage
  return successResponse(res, {}, "Lesson created", 201);
});
const updateLesson = asyncHandler(async (req, res) => {
  return successResponse(res, {}, "Lesson updated");
});
const deleteLesson = asyncHandler(async (req, res) => {
  // TODO: delete from Bunny.net or Supabase Storage too
  return successResponse(res, {}, "Lesson deleted");
});
const getLessonById = asyncHandler(async (req, res) => {
  // TODO: check enrollment before returning video/file URL
  return successResponse(res, {});
});
module.exports = { createLesson, updateLesson, deleteLesson, getLessonById };
