const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Capital 'S' in Schema
    ref: 'User',
    required: true
  },
  pinned: {
  type: Boolean,
  default: false
},
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: "General"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('notes', NotesSchema);
