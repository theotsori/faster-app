// models/Quote.js
const QuoteSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    category: String
  });
  
  module.exports = mongoose.model('Quote', QuoteSchema);