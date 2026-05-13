const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const multer = require('multer');
const uploadToImgBB = require('./utils/upload');
const { protect } = require('./middleware/auth');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

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

// Basic route
app.get('/', (req, res) => {
    res.send('Sahara Homestay API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
