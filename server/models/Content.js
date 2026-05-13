const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    section: { type: String, required: true, unique: true }, // e.g., 'hero', 'about', 'contact'
    data: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
