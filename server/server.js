const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const multer = require('multer');
const uploadToImgBB = require('./utils/upload');
const { protect } = require('./middleware/auth');
const Client = require('./models/Client');

// Load env vars
dotenv.config();

// Connect to database and seed data
connectDB().then(async () => {
    try {
        const count = await Client.countDocuments({});
        if (count === 0) {
            const seedData = [
                { logo: '/logo.png', text: 'Sahara Luxury Travel' },
                { logo: '/logo.png', text: 'Desert Adventures Co.' },
                { logo: '/logo.png', text: 'Nomad Oasis Safaris' },
                { logo: null, text: 'Heritage Stay Network' },
                { logo: '/logo.png', text: null },
                { logo: '/logo.png', text: 'Royal Sand Lodges' }
            ];
            await Client.insertMany(seedData);
            console.log('Seed clients populated successfully.');
        }
    } catch (err) {
        console.error('Error seeding clients:', err.message);
    }
});

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));
app.use('/api/content', require('./routes/content'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/clients', require('./routes/clients'));


// Upload Route
const upload = multer({ storage: multer.memoryStorage() });
app.post('/api/upload', protect, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }
        const url = await uploadToImgBB(req.file.buffer);
        res.json({ url });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.send('OK');
});

app.get('/api/health', (req, res) => {
    res.send('ok');
});


// Basic route
app.get('/', (req, res) => {
    res.send('Sahara Homestay API is running...');
});

const PORT = process.env.PORT || 5000;

if (require.main === module || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
}

module.exports = app;

