// routes/journal.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createJournalEntry,
  getJournalEntries,
} = require('../controllers/journalController');

// Journal routes
router.route('/')
  .post(protect, createJournalEntry) // Create a new journal entry
  .get(protect, getJournalEntries);  // Get all journal entries for the user

module.exports = router;