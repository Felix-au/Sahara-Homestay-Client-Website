const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { protect } = require('../middleware/auth');

// @desc    Get all rooms
// @route   GET /api/rooms
// @access  Public
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find({});
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get single room
// @route   GET /api/rooms/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (room) {
            res.json(room);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a room
// @route   POST /api/rooms
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
    try {
        const room = new Room(req.body);
        const createdRoom = await room.save();
        res.status(201).json(createdRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a room
// @route   PUT /api/rooms/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (room) {
            Object.assign(room, req.body);
            const updatedRoom = await room.save();
            res.json(updatedRoom);
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (room) {
            await room.deleteOne();
            res.json({ message: 'Room removed' });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
