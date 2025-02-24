const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  content: String,
  mood: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', JournalSchema);