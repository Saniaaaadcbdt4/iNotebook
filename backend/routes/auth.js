const bcrypt = require("bcryptjs");
const express = require("express");
const User = require("../models/User.js");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey123";

/* =====================================================
   SIGNUP
===================================================== */
router.post(
  "/create",
  [
    body("name").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { name, password } = req.body;

      let existingUser = await User.findOne({ name });
      if (existingUser)
        return res.status(400).json({ success: false, error: "Username already taken" });

      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        password: securePass,
      });

      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authtoken });
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

/* =====================================================
   LOGIN
===================================================== */
router.post(
  "/login",
  [
    body("name").exists(),
    body("password").exists(),
  ],
  async (req, res) => {
    let success = false;

    try {
      const { name, password } = req.body;

      const user = await User.findOne({ name });
      if (!user)
        return res.status(400).json({ success, error: "Invalid credentials" });

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare)
        return res.status(400).json({ success, error: "Invalid credentials" });

      const data = { user: { id: user.id } };
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.json({
        success,
        authtoken,
        twoFA: user.twoFA, // frontend ko pata chale 2FA on hai ya nahi
      });
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
);

/* =====================================================
   CHECK USER
===================================================== */
router.post("/check", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -twoFAPin");
    res.json({ success: true, user });
  } catch {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/* =====================================================
   GET PROFILE
===================================================== */
router.get("/profile", fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -twoFAPin");
    res.json({ success: true, user });
  } catch {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

/* =====================================================
   UPDATE PROFILE
===================================================== */
router.put("/update", fetchuser, async (req, res) => {
  try {
    const { name, bio, profilePicture } = req.body;
    //testing
     let updateFields = {};
    if (name) updateFields.name = name;
    if (bio) updateFields.bio = bio;
    if (profilePicture) updateFields.profilePicture = profilePicture;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      /*{ name, bio, profilePicture },
      { new: true }*/
        { $set: updateFields },
      { new: true }
    ).select("-password -twoFAPin");

    res.json({ success: true, user: updatedUser });
  } catch {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

/* =====================================================
   CHANGE PASSWORD
===================================================== */
router.put("/change-password", fetchuser, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch)
      return res.status(400).json({ success: false, error: "Old password incorrect" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

/* =====================================================
   DEACTIVATE ACCOUNT
===================================================== */
router.put("/deactivate-account", fetchuser, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });
    res.json({ success: true, message: "Account deactivated" });
  } catch {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

/* =====================================================
   DELETE ACCOUNT
===================================================== */
router.delete("/delete-account", fetchuser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ success: true, message: "Account deleted successfully" });
  } catch {
    res.status(500).json({ success: false, error: "Server Error" });
  }
});

/* =====================================================
   ENABLE / DISABLE 2FA  (HASHING INCLUDED)
===================================================== */
router.put("/twofactor", fetchuser, async (req, res) => {
  const { enable, pin } = req.body;

  try {
    if (enable) {
      if (!pin || pin.length !== 4)
        return res.status(400).json({ success: false, error: "PIN must be 4 digits" });

      const salt = await bcrypt.genSalt(10);
      const hashedPin = await bcrypt.hash(String(pin), salt);

      await User.findByIdAndUpdate(req.user.id, {
        twoFA: true,
        twoFAPin: hashedPin,
        last2FAVerified: new Date(),
      });

      return res.json({ success: true, message: "2FA enabled" });
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        twoFA: false,
        twoFAPin: null,
        last2FAVerified: null,
      });

      return res.json({ success: true, message: "2FA disabled" });
    }
  } catch (err) {
    console.error("2FA ERROR:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
});

/* =====================================================
   VERIFY 2FA PIN  (HASHED)
===================================================== */
router.post("/verify-2fa", fetchuser, async (req, res) => {
  const { pin } = req.body;

  try {
    if (!pin)
      return res.status(400).json({ success: false, error: "PIN required" });

    const user = await User.findById(req.user.id);

    if (!user.twoFA || !user.twoFAPin)
      return res.status(400).json({ success: false, error: "2FA not enabled" });

    const isMatch = await bcrypt.compare(String(pin), user.twoFAPin);
    console.log("REQ BODY at verify-2fa:", req.body);


    if (!isMatch)
      
      return res.status(400).json({ success: false, error: "Invalid PIN" });

    user.last2FAVerified = new Date();
    await user.save();

    return res.json({ success: true, message: "2FA verified" });
  } catch (err) {
    console.error("VERIFY 2FA ERROR:", err);
    return res.status(500).json({ success: false, error: "Server error" });
    
  }
});

module.exports = router;
