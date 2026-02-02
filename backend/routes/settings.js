const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");
const User = require("../models/User");

// ROUTE 1: Change Password
router.put("/changepassword", fetchuser, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Update Privacy
router.put("/privacy", fetchuser, async (req, res) => {
  try {
    const { privacy } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { privacy },
      { new: true }
    );
    res.json({ success: true, message: "Privacy updated", user });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Toggle 2FA
// POST /api/auth/twofa
// In routes/settings.js
router.post("/twofactor", fetchuser, async (req, res) => {
  const { enable, pin } = req.body;
  const userId = req.user.id;

  try {
    if (enable) {
      // save PIN for user (hashed, ideally)
      await User.findByIdAndUpdate(userId, { twoFA: true, twoFAPin: pin });
      res.json({ success: true, message: "2FA enabled" });
    } else {
      await User.findByIdAndUpdate(userId, { twoFA: false, twoFAPin: null });
      res.json({ success: true, message: "2FA disabled" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});


// ROUTE 4: Deactivate Account
router.put("/deactivate", fetchuser, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isActive: false });
    res.json({ success: true, message: "Account deactivated" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 5: Delete Account
router.delete("/delete", fetchuser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ success: true, message: "Account deleted permanently" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
