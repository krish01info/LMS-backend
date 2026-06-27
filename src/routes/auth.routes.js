const express = require("express");
const router = express.Router();
const { register, login, googleCallback, forgotPassword, resetPassword, refreshToken } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

// POST /api/auth/register
router.post("/register", register);
// POST /api/auth/login
router.post("/login", login);
// GET  /api/auth/google
router.get("/google", /* passport.authenticate("google", { scope: ["profile", "email"] }) */ (req, res) => res.json({ msg: "TODO: Google OAuth" }));
// GET  /api/auth/google/callback
router.get("/google/callback", googleCallback);
// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);
// POST /api/auth/reset-password/:token
router.post("/reset-password/:token", resetPassword);
// POST /api/auth/refresh
router.post("/refresh", refreshToken);

module.exports = router;
