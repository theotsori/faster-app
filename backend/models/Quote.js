// models/Quote.js
const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    category: String
  });
  
  module.exports = mongoose.model('Quote', QuoteSchema);