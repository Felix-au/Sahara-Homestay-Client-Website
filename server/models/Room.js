const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    sharingType: { type: String, enum: ['Single', 'Double', 'Triple', 'Quadruple'], required: true },
    amenities: [{ type: String }],
    images: [{ type: String }],
    description: { type: String },
    isAC: { type: Boolean, default: false },
    available: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Room', roomSchema);
