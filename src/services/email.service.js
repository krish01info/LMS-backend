const nodemailer = require("nodemailer");

// TODO: Create transporter using Gmail SMTP from .env
const transporter = null;

const sendEmail = async ({ to, subject, html }) => {
  // TODO: transporter.sendMail({ from: process.env.EMAIL_FROM, to, subject, html })
};

const sendRegistrationEmail = async (user) => {
  // TODO: call sendEmail with registration template
};

const sendPasswordResetEmail = async (user, resetUrl) => {
  // TODO: call sendEmail with password reset template
};

const sendEnrollmentConfirmationEmail = async (user, course) => {
  // TODO: call sendEmail with enrollment template
};

const sendAssignmentGradedEmail = async (user, assignment) => {
  // TODO: call sendEmail with graded template
};

const sendCertificateEmail = async (user, course) => {
  // TODO: call sendEmail with certificate template
};

module.exports = {
  sendEmail,
  sendRegistrationEmail,
  sendPasswordResetEmail,
  sendEnrollmentConfirmationEmail,
  sendAssignmentGradedEmail,
  sendCertificateEmail,
};
