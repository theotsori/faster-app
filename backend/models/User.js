// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fastingProgress: { type: Number, default: 0 },
  journalEntriesCount: { type: Number, default: 0 },
  mood: { type: String, default: 'Neutral' },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);