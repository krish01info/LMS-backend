const asyncHandler = require("../utils/asyncHandler");
const { errorResponse } = require("../utils/response");
const { verifyToken } = require("../utils/jwt");
const prisma = require("../config/db");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return errorResponse(res, "Not authorized, no token", 401);
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
      },
    });

    if (!req.user) {
      return errorResponse(res, "User not found", 401);
    }

    if (req.user.status === "SUSPENDED") {
      return errorResponse(res, "Account suspended", 403);
    }

    next();
  } catch (err) {
    return errorResponse(res, "Not authorized, invalid token", 401);
  }
});

module.exports = { protect };