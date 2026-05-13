const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    guestName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' },
    message: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
