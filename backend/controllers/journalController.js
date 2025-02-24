// controllers/journalController.js
const Journal = require('../models/Journal');

// Create a new journal entry
exports.createJournalEntry = async (req, res) => {
  try {
    const { title, content, mood } = req.body;
    const journal = new Journal({
      userId: req.user.id, // Assumes user ID is set by auth middleware
      title,
      content,
      mood,
    });
    await journal.save();
    res.status(201).json(journal);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all journal entries for the authenticated user
exports.getJournalEntries = async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user.id });
    res.json(journals);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};