const express = require('express');
const router = express.Router();
const Content = require('../models/Content');
const { protect } = require('../middleware/auth');

// @desc    Get all content
// @route   GET /api/content
// @access  Public
router.get('/', async (req, res) => {
    try {
        const content = await Content.find({});
        res.json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update content
// @route   PUT /api/content/:section
// @access  Private/Admin
router.put('/:section', protect, async (req, res) => {
    try {
        const content = await Content.findOne({ section: req.params.section });
        if (content) {
            content.data = req.body;
            const updatedContent = await content.save();
            res.json(updatedContent);
        } else {
            const newContent = new Content({
                section: req.params.section,
                data: req.body
            });
            const createdContent = await newContent.save();
            res.status(201).json(createdContent);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
