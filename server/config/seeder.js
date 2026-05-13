const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const Room = require('../models/Room');
const Content = require('../models/Content');
const connectDB = require('./db');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        // Clear existing data
        await Admin.deleteMany();
        await Room.deleteMany();
        await Content.deleteMany();

        // Create Admin
        await Admin.create({
            username: process.env.ADMIN_USER || 'admin',
            password: process.env.ADMIN_PASS || 'admin123'
        });

        // Create Rooms
        await Room.create([
            {
                title: 'Premium Single Room',
                price: 12000,
                sharingType: 'Single',
                isAC: true,
                amenities: ['Wi-Fi', 'Washing Machine', 'Power Backup', 'Food'],
                description: 'A cozy single room with all modern amenities.',
                images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267']
            },
            {
                title: 'Economy Double Sharing',
                price: 8000,
                sharingType: 'Double',
                isAC: false,
                amenities: ['Wi-Fi', 'Power Backup', 'Parking'],
                description: 'Affordable double sharing room.',
                images: ['https://images.unsplash.com/photo-1598928506311-c55ded91a20c']
            }
        ]);

        // Create Initial Content
        await Content.create([
            {
                section: 'hero',
                data: {
                    title: 'Find comfort in your home away from home',
                    subtitle: 'Experience premium homestay living in Dharuhera with state-of-the-art facilities.'
                }
            },
            {
                section: 'contact',
                data: {
                    phone: '+91 99999 99999',
                    email: 'contact@saharahomestay.in',
                    address: 'Dharuhera, Rewari, Haryana'
                }
            }
        ]);

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
