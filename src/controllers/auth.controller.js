const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const { generateAccessToken, generateRefreshToken, verifyToken } = require("../utils/jwt");
const prisma = require("../config/db");

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return errorResponse(res, "Name, email and password are required", 400);
  }

  // Only allow valid self-registration roles
  const allowedRoles = ["STUDENT", "TEACHER", "PARENT"];
  if (role && !allowedRoles.includes(role)) {
    return errorResponse(res, "Invalid role", 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return errorResponse(res, "Email already registered", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || "STUDENT",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  // If teacher, create teacher profile automatically
  if (user.role === "TEACHER") {
    await prisma.teacherProfile.create({
      data: { userId: user.id },
    });
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

  return successResponse(
    res,
    { user, accessToken, refreshToken },
    "Registered successfully",
    201
  );
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return errorResponse(res, "Email and password are required", 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return errorResponse(res, "Invalid credentials", 401);
  }

  if (!user.password) {
    return errorResponse(res, "Please login with Google", 401);
  }

  if (user.status === "SUSPENDED") {
    return errorResponse(res, "Account suspended", 403);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return errorResponse(res, "Invalid credentials", 401);
  }

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user.id, role: user.role });

  return successResponse(res, {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
    accessToken,
    refreshToken,
  }, "Login successful");
});

// POST /api/auth/refresh
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;

  if (!token) {
    return errorResponse(res, "Refresh token required", 400);
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_REFRESH_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return errorResponse(res, "User not found", 401);
    }

    const accessToken = generateAccessToken({ id: user.id, role: user.role });

    return successResponse(res, { accessToken }, "Token refreshed");
  } catch (err) {
    return errorResponse(res, "Invalid or expired refresh token", 401);
  }
});

// POST /api/auth/forgot-password
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return errorResponse(res, "Email is required", 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to prevent email enumeration
  if (!user) {
    return successResponse(res, {}, "If that email exists, a reset link has been sent");
  }

  // Generate a simple reset token (JWT valid for 15 min)
  const resetToken = generateAccessToken({ id: user.id, purpose: "reset" });

  // TODO: send email with reset link containing resetToken
  // await sendPasswordResetEmail(user.email, resetToken);

  return successResponse(res, { resetToken }, "Reset token generated");
});

// POST /api/auth/reset-password/:token
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    return errorResponse(res, "New password is required", 400);
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);

    if (decoded.purpose !== "reset") {
      return errorResponse(res, "Invalid reset token", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    return successResponse(res, {}, "Password reset successful");
  } catch (err) {
    return errorResponse(res, "Invalid or expired reset token", 400);
  }
});

// Google OAuth callback (handled by passport)
const googleCallback = asyncHandler(async (req, res) => {
  // TODO: wire passport google strategy
  return successResponse(res, {}, "Google OAuth TODO");
});

module.exports = {
  register,
  login,
  refreshToken,
  forgotPassword,
  resetPassword,
  googleCallback,
};