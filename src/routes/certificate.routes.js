const express = require("express");
const router = express.Router();
const { generateCertificate, getMyCertificates } = require("../controllers/certificate.controller");
const { protect } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");

router.use(protect);
router.post("/generate/:courseId", authorize("STUDENT"), generateCertificate);
router.get("/my", getMyCertificates);

module.exports = router;
