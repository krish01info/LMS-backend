const { errorResponse } = require("../utils/response");

// Usage: authorize("ADMIN", "SUPER_ADMIN")
const authorize = (...roles) => (req, res, next) => {
  // TODO: check req.user.role against allowed roles
  // TODO: return 403 if not allowed
  next();
};

module.exports = { authorize };
