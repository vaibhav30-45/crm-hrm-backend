
require("dotenv").config(); 
const app = require("./app");
const connectDB = require("./config/database");
const seedAdmin = require("./seed/admin.seed");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1️⃣ Connect to MongoDB
    await connectDB();
    console.log("✅ MongoDB connected");

    // 2️⃣ Seed first admin (one-time)
    await seedAdmin();

    // 3️⃣ Start Express server
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Server failed to start", err);
    process.exit(1);
  }
};

// Start server
startServer();
