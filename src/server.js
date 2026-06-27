const fs = require("fs");
const path = require("path");
const app = require("./app");
const config = require("./config");
// const { connectDB } = require("./config/database");   // enable when DB is configured
// const { connectRedis } = require("./config/redis");   // enable when Redis is configured

// ─── Ensure uploads/ dir exists (local dev disk storage fallback) ─────────────
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Created uploads/ directory");
}

const start = async () => {
  // await connectDB();      // uncomment when DB is ready
  // await connectRedis();   // uncomment when Redis is ready

  const PORT = config.port || 5000;

  app.listen(PORT, () => {
    console.log(`\n🚀 LMS API server running`);
    console.log(`   ► Local   : http://localhost:${PORT}`);
    console.log(`   ► Health  : http://localhost:${PORT}/health`);
    console.log(`   ► Env     : ${config.env}\n`);
  });
};

start().catch((err) => {
  console.error("❌ Failed to start server:", err.message);
  process.exit(1);
});
