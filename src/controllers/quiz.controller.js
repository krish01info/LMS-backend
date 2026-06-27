const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const createQuiz = asyncHandler(async (req, res) => {
  // TODO: teacher creates quiz with questions
  return successResponse(res, {}, "Quiz created", 201);
});

const getQuizzesByCourse = asyncHandler(async (req, res) => {
  // TODO: get all quizzes for a course
  return successResponse(res, []);
});

const getQuizById = asyncHandler(async (req, res) => {
  // TODO: get quiz with questions (hide correctAnswer for students)
  return successResponse(res, {});
});

const submitQuiz = asyncHandler(async (req, res) => {
  // TODO: student submits answers
  // TODO: auto-grade, save attempt, return score
  return successResponse(res, {}, "Quiz submitted");
});

const getMyAttempts = asyncHandler(async (req, res) => {
  // TODO: student - get their quiz attempts
  return successResponse(res, []);
});

const deleteQuiz = asyncHandler(async (req, res) => {
  // TODO: teacher deletes quiz
  return successResponse(res, {}, "Quiz deleted");
});

module.exports = { createQuiz, getQuizzesByCourse, getQuizById, submitQuiz, getMyAttempts, deleteQuiz };
