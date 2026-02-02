const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Feedback = require("../models/Feedback");

// Route 1 :: Fetch all feedbacks
router.get("/fetchallfeedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ date: -1 });
    res.json(feedbacks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" }); // ✅ fixed
  }
});

// Route 2 :: Add new feedback
router.post(
  "/addfeedback",
  [
    body("name").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("feedback").isLength({ min: 5 }).withMessage("Feedback must be at least 5 characters"),
  ],
  async (req, res) => {
    try {
      const { name, email, feedback, rating } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // ✅ already JSON
      }

      const newFeedback = new Feedback({
        name,
        email,
        feedback,
        rating,
      });

      const savedFeedback = await newFeedback.save();
      res.json(savedFeedback); // ✅ success response in JSON
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal Server Error" }); // ✅ fixed
    }
  }
);


module.exports = router;
