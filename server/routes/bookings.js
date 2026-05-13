const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { protect } = require('../middleware/auth');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Public
router.post('/', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        const createdBooking = await booking.save();
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({}).populate('room', 'title');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (booking) {
            booking.status = req.body.status || booking.status;
            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
