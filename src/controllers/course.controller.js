const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const createCourse = asyncHandler(async (req, res) => {
  // TODO: teacher creates course (DRAFT by default)
  return successResponse(res, {}, "Course created", 201);
});

const getAllCourses = asyncHandler(async (req, res) => {
  // TODO: public - return published courses with filters (domain, category, difficulty)
  return successResponse(res, []);
});

const getCourseById = asyncHandler(async (req, res) => {
  // TODO: return course with sections + lessons (lesson content gated by enrollment)
  return successResponse(res, {});
});

const updateCourse = asyncHandler(async (req, res) => {
  // TODO: teacher (own course) or admin
  return successResponse(res, {}, "Course updated");
});

const deleteCourse = asyncHandler(async (req, res) => {
  // TODO: admin or teacher (own)
  return successResponse(res, {}, "Course deleted");
});

const publishCourse = asyncHandler(async (req, res) => {
  // TODO: set status to PUBLISHED
  return successResponse(res, {}, "Course published");
});

const getTeacherCourses = asyncHandler(async (req, res) => {
  // TODO: return all courses by logged-in teacher
  return successResponse(res, []);
});

module.exports = { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse, publishCourse, getTeacherCourses };
