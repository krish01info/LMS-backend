const asyncHandler = require("../utils/asyncHandler");
const { successResponse, errorResponse } = require("../utils/response");
const prisma = require("../config/db");

// TODO: Import relevant services as needed

const generateCertificate = asyncHandler(async (req, res) => {
  // TODO: check course completion >= required %
  // TODO: generate certificate (PDF or record)
  // TODO: upload to Supabase Storage
  // TODO: save certificate record
  // TODO: send certificate email
  return successResponse(res, {}, "Certificate generated", 201);
});

const getMyCertificates = asyncHandler(async (req, res) => {
  // TODO: return all certificates for logged-in user
  return successResponse(res, []);
});

module.exports = { generateCertificate, getMyCertificates };
