const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/auth');

// @desc    Auth admin & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (admin && (await admin.comparePassword(password))) {
            const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });

            res.json({
                _id: admin._id,
                username: admin.username,
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update admin credentials
// @route   PUT /api/auth/update
// @access  Private
router.put('/update', protect, async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findById(req.user._id);

        if (admin) {
            if (username) admin.username = username;
            if (password) admin.password = password;

            const updatedAdmin = await admin.save();

            res.json({
                _id: updatedAdmin._id,
                username: updatedAdmin.username,
                message: 'Credentials updated successfully'
            });
        } else {
            res.status(404).json({ message: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
