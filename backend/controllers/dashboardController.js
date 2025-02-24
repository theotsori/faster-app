// controllers/dashboardController.js
const User = require('../models/User');
const Quote = require('../models/Quote');
const Journal = require('../models/Journal');

exports.getDashboardMetrics = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const journalCount = await Journal.countDocuments({ userId: req.user.id });

    const metrics = {
      fastingProgress: user.fastingProgress,
      journalEntries: journalCount,
      mood: user.mood,
      streak: user.streak
    };

    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateFastingProgress = async (req, res) => {
  try {
    const { progress } = req.body;
    const user = await User.findById(req.user.id);

    user.fastingProgress = progress;
    if (progress >= 100) {
      user.streak += 1;
    }
    await user.save();

    res.json({ fastingProgress: user.fastingProgress, streak: user.streak });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDailyQuote = async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);
    const quote = await Quote.findOne().skip(random);

    res.json({
      quote: quote.text,
      author: quote.author
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};