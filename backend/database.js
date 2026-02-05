const mongoose = require('mongoose');
require('dotenv').config(); // taake .env file load ho jaye

const cToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB Atlas successfully");
  } catch (e) {
    console.log("❌ Error connecting to MongoDB:", e.message);
  }
};

module.exports = cToMongo;
