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
                title: 'Single Sharing Room',
                location: 'Haryana',
                priceCooler: 10000,
                priceAC: 15000,
                sharingType: 'Single',
                amenities: ['Wi-Fi', 'Washing Machine', 'Power Backup', 'Food'],
                description: 'Enjoy complete privacy and comfort in a cozy space ideal for solo living and studying peacefully.',
                images: ['/singlesharing.webp']
            },
            {
                title: 'Double Sharing Room',
                location: 'Haryana',
                priceCooler: 7000,
                priceAC: 9000,
                sharingType: 'Double',
                amenities: ['Wi-Fi', 'Power Backup', 'Parking'],
                description: 'Perfect for roommates or friends, this room offers ample space and a comfortable shared living environment.',
                images: ['/doublesahring.webp']
            },
            {
                title: 'Triple Sharing Room',
                location: 'Haryana',
                priceCooler: 5000,
                priceAC: 7000,
                sharingType: 'Triple',
                amenities: ['Wi-Fi', 'Power Backup'],
                description: 'A great option for budget-conscious students, providing community living with enough space for three people.',
                images: ['/triplesharing.webp']
            },
            {
                title: 'Quadruple Sharing Room',
                location: 'Haryana',
                priceCooler: 4500,
                priceAC: 0,
                sharingType: 'Quadruple',
                amenities: ['Wi-Fi', 'Power Backup'],
                description: 'Spacious and budget-friendly room ideal for groups, encouraging social and collaborative living.',
                images: ['/quaruple sharing.webp']
            }
        ]);

        // Create Initial Content
        await Content.create([
            {
                section: 'hero',
                data: {
                    title: 'Find comfort in your home away from home',
                    subtitle: 'Experience premium homestay living in Dharuhera with state-of-the-art facilities.',
                    image: '/herosectionimg.jpeg'
                }
            },
            {
                section: 'rooms_config',
                data: {
                    columns: 3
                }
            },
            {
                section: 'contact',
                data: {
                    phone: '+91 7300048228',
                    email: 'saharahomestay.dhr@gmail.com',
                    address: 'Plot No 116 Sector 6 Near Primary Govt School Dharuehra Rewari Haryana 123106',
                    workingTime: 'Everyday 10 am — 8 pm'
                }
            },
            {
                section: 'gallery',
                data: {
                    images: [
                        '/gallery-1.jpeg',
                        '/gallery-2.jpeg',
                        '/gallery-3.jpeg',
                        '/gallery-4.jpeg'
                    ],
                    columns: 4
                }
            },
            {
                section: 'locations',
                data: {
                    maps: [
                        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.8408208863543!2d76.79398647539784!3d28.2121484030468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d487685991fab%3A0x6850ed6d870b3fba!2s125%2C%20Sector%206%2C%20Dharuhera%2C%20Haryana%20123110!5e0!3m2!1sen!2sin!4v1778668317282!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
                        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.8097149589653!2d76.79374507539791!3d28.21309330300434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d487664dd3931%3A0xb0078f0fb22dec00!2s106%2C%20Sector%206%2C%20Dharuhera%2C%20Haryana%20123110!5e0!3m2!1sen!2sin!4v1778668358351!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
                        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.843016601477!2d76.79369207539781!3d28.21208170304969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d48768f058bff%3A0x8813784575c0cd8b!2s116%2C%20Sector%206%2C%20Dharuhera%2C%20Haryana%20123110!5e0!3m2!1sen!2sin!4v1778668420763!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
                        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.2426496593225!2d76.8361269!3d28.1999395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d37e637f23e23%3A0xf94d818f6d23abda!2s749%2C%20Sector%205%20Rd%2C%20Sector%205%2C%20U.I.T.%2C%20Bhiwadi%2C%20Rajasthan%20301019!5e0!3m2!1sen!2sin!4v1778668454738!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
                    ],
                    columns: 2
                }
            },
            {
                section: 'testimonials',
                data: {
                    items: [
                        {
                            id: 1,
                            name: "Vidyansh Gupta",
                            text: "I’ve had a great stay here—clean rooms, good food, reliable Wi-Fi, and helpful staff. Very safe and comfortable overall.",
                            image: "/p1.jpeg",
                        },
                        {
                            id: 2,
                            name: "Gujjar",
                            text: "This PG exceeded expectations—neat environment, responsive staff, strong security, and excellent facilities. Definitely recommend for a peaceful, easy stay.",
                            image: "/p2.jpeg",
                        },
                        {
                            id: 3,
                            name: "Akshay",
                            text: "Very satisfied with the amenities and support here. Daily meals are hygienic, and the location is convenient for everything.",
                            image: "/p3.jpeg",
                        }
                    ]
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
