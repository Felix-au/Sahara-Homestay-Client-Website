const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { protect } = require('../middleware/auth');

// @desc    Get all clients
// @route   GET /api/clients
// @access  Public
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Create a client
// @route   POST /api/clients
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
    try {
        const { logo, text } = req.body;
        const newClient = new Client({ logo, text });
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a client
// @route   PUT /api/clients/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
    try {
        const { logo, text } = req.body;
        const client = await Client.findById(req.params.id);
        if (client) {
            client.logo = logo !== undefined ? logo : client.logo;
            client.text = text !== undefined ? text : client.text;
            const updatedClient = await client.save();
            res.json(updatedClient);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete a client
// @route   DELETE /api/clients/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (client) {
            await client.deleteOne();
            res.json({ message: 'Client removed' });
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
