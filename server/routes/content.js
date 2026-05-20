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

// @desc    Sync reviews from Google Maps via SerpApi (returns mapped reviews for preview)
// @route   POST /api/content/sync-google-reviews
// @access  Private/Admin
router.post('/sync-google-reviews', protect, async (req, res) => {
    const axios = require('axios');
    const apiKey = process.env.SERPAPI_API_KEY;
    if (!apiKey) {
        return res.status(400).json({ message: 'SERPAPI_API_KEY is not configured in backend environment variables.' });
    }

    try {
        const response = await axios.get('https://serpapi.com/search', {
            params: {
                engine: 'google_maps_reviews',
                data_id: '0x390d499f2ace8cc1:0xd20fa6362d3613a1',
                api_key: apiKey
            }
        });

        const googleReviews = response.data.reviews || [];
        
        // Map SerpApi reviews to Sahara Homestay testimonial schema
        const items = googleReviews.map((r, index) => ({
            id: index + 1,
            name: r.name,
            text: r.snippet || r.text || '',
            image: r.thumbnail || ''
        }));

        res.json({
            section: 'testimonials',
            data: { items }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews from SerpApi: ' + (error.response?.data?.error || error.message) });
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
