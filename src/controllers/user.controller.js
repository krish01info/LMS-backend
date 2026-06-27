const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const getMe = asyncHandler(async (req, res) => {
  // TODO: return req.user profile
  return successResponse(res, {});
});

const updateProfile = asyncHandler(async (req, res) => {
  // TODO: update name, avatar
  return successResponse(res, {}, "Profile updated");
});

const getAllUsers = asyncHandler(async (req, res) => {
  // TODO: admin only - paginated list of users
  return successResponse(res, []);
});

const getUserById = asyncHandler(async (req, res) => {
  // TODO: find user by id
  return successResponse(res, {});
});

const updateUserRole = asyncHandler(async (req, res) => {
  // TODO: super admin only - change user role
  return successResponse(res, {}, "Role updated");
});

const suspendUser = asyncHandler(async (req, res) => {
  // TODO: admin/super admin - set status to SUSPENDED
  return successResponse(res, {}, "User suspended");
});

const linkParentStudent = asyncHandler(async (req, res) => {
  // TODO: create ParentStudent record
  return successResponse(res, {}, "Linked successfully", 201);
});

module.exports = { getMe, updateProfile, getAllUsers, getUserById, updateUserRole, suspendUser, linkParentStudent };
