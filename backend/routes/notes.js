const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// Helper function: fetch sorted notes (pinned first, latest first)
const getSortedNotes = async (userId) => {
  return await Notes.find({ user: userId }).sort({ pinned: -1, date: -1 });
};

// 🟢 ROUTE 1 :: Fetch all notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await getSortedNotes(req.user.id);
    res.json({ success: true, notes });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 🟢 ROUTE 2 :: Add a new note
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title").isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
    body("description").isLength({ min: 5 }).withMessage("Description must be at least 5 characters"),
    body("tag").isLength({ min: 1 }).withMessage("Tag must be at least 1 character"),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ success: false, error: error.array() });
      }

      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
        pinned: false,
      });

      await note.save();

      const notes = await getSortedNotes(req.user.id);
      res.json({ success: true, notes });
    } catch (error) {
      console.error("Add Error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
);

// 🟢 ROUTE 3 :: Update (Edit or Pin/Unpin)
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag, pinned } = req.body;

    const newNotes = {};
    if (title) newNotes.title = title;
    if (description) newNotes.description = description;
    if (tag) newNotes.tag = tag;
    if (pinned !== undefined) newNotes.pinned = pinned;

    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "Not allowed" });
    }

    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );

    return res.json({ success: true, note: updatedNote });

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// 🟢 ROUTE 4 :: Delete a note
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: "Note not found" });

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "Not allowed" });
    }

    await Notes.findByIdAndDelete(req.params.id);

    const notes = await getSortedNotes(req.user.id);
    res.json({ success: true, notes });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
