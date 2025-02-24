// routes/dashboard.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getDashboardMetrics,
  updateFastingProgress,
  getDailyQuote
} = require('../controllers/dashboardController');

router.route('/metrics')
  .get(protect, getDashboardMetrics);

router.route('/fasting')
  .put(protect, updateFastingProgress);

router.route('/quote')
  .get(protect, getDailyQuote);

module.exports = router;