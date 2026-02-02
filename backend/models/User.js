const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,   // username should stay unique
  },

  password: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    default: "",
  },

  profilePicture: {
    type: String,
    default: "",
  },
  email:{
    type: String,
    default:"",
  }
,
  joined: {
    type: Date,
    default: Date.now,
  },

  date: {
    type: Date,
    default: Date.now,
  },

  privacy: {
    type: Boolean,
    default: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // ✅ NEW FIELDS FOR 2FA
  twoFA: {
    type: Boolean,
    default: false,
  },
  twoFAPin: {
    type: String, // you can hash it with bcrypt if you want more security
    default: null,
  },
  last2FAVerified: {
    type: Date,
    default: null, // store the timestamp when user last verified 2FA
  },
});

module.exports = mongoose.model("User", UserSchema);
