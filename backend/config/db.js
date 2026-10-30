const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // ✅ FIX 1 - URI lekapothe - Mundhe aapu - Confusing error vaddu
    if (!process.env.MONGODB_URI) {
      console.error("❌ MONGODB_URI missing in .env - Check .env file");
      process.exit(1);
    }

    // ✅ FIX 2 - Options - Atlas + Render ki - Fast + Stable
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // 10 sec lo - Connect avvakapothe - Aapu
      maxPoolSize: 10,
    });

    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB failed:", error.message);
    // ✅ FIX 3 - Render lo - Restart ayye chance ivvu - Direct exit vaddu anukunte - Ee line teesey
    process.exit(1);
  }
};

// ✅ FIX 4 - Connection pothe - Telusthundhi
mongoose.connection.on("disconnected", () => {
  console.log("⚠️ MongoDB disconnected - Check Atlas / Internet");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err.message);
});

module.exports = connectDB;