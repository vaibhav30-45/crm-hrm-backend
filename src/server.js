require("dotenv").config();   // ✅ SABSE UPAR

const app = require("./app");
const connectDB = require("./config/database");
const seedAdmin = require("./seed/admin.seed");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");

    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Server failed to start", err);
    process.exit(1);
  }
};

startServer();
