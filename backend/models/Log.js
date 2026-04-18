const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  duration: { type: String, required: true },
  description: { type: String, required: true }
});

const logSchema = new mongoose.Schema({
  originalInput: { type: String, required: true },
  role: { type: String, required: true },
  generatedLogs: [sectionSchema],
  aiScore: {
    human: { type: Number, default: 0 },
    ai: { type: Number, default: 0 }
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', logSchema);
