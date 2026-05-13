import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import RoomCard from '../components/RoomCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingData, setBookingData] = useState({
        guestName: '',
        email: '',
        phone: '',
        checkInDate: ''
    });

    const handleBookingClick = (room) => {
        setSelectedRoom(room);
        setIsBookingModalOpen(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/bookings', {
                ...bookingData,
                room: selectedRoom._id
            });
            alert("Booking request submitted successfully! We will contact you soon.");
            setIsBookingModalOpen(false);
            setBookingData({ guestName: '', email: '', phone: '', checkInDate: '' });
        } catch (error) {
            alert("Error submitting booking. Please try again.");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [roomsRes, contentRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/rooms'),
                    axios.get('http://localhost:5000/api/content')
                ]);
                setRooms(roomsRes.data);
                
                // Convert content array to object
                const contentMap = {};
                contentRes.data.forEach(item => {
                    contentMap[item.section] = item.data;
                });
                setContent(contentMap);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <Hero content={content.hero} />

            {/* Rooms Section */}
            <section id="rooms" className="bg-bg-light">
                <div className="container">
                    <div className="section-title">
                        <h2>Our Rooms</h2>
                        <p className="text-text-muted">Choose the perfect living space for your needs</p>
                        <div className="underline"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rooms.map((room) => (
                            <RoomCard key={room._id} room={room} onBook={() => handleBookingClick(room)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section id="amenities" className="bg-white">
                <div className="container">
                    <div className="section-title">
                        <h2>World-Class Amenities</h2>
                        <div className="underline"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
                        {[
                            { name: 'Free Wi-Fi', icon: '📶' },
                            { name: 'Power Backup', icon: '⚡' },
                            { name: 'CCTV Security', icon: '🛡️' },
                            { name: 'Housekeeping', icon: '🧹' },
                            { name: 'Laundry', icon: '🧺' },
                            { name: 'RO Water', icon: '💧' }
                        ].map((item, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ scale: 1.05 }}
                                className="p-6 rounded-2xl bg-bg-light shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h4 className="text-lg">{item.name}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section id="contact" className="bg-bg-light">
                <div className="container">
                    <div className="section-title">
                        <h2>Locate Us</h2>
                        <div className="underline"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="glass-card p-8">
                            <h3 className="text-3xl mb-6 font-playfair">Visit Our Branches</h3>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h4 className="text-primary text-xl mb-2">Branch 1 - Dharuhera</h4>
                                    <p className="text-text-muted">Sector 6, Near Main Market, Dharuhera, Haryana</p>
                                </div>
                                <div>
                                    <h4 className="text-primary text-xl mb-2">Branch 2 - Rewari</h4>
                                    <p className="text-text-muted">Model Town, Rewari, Haryana</p>
                                </div>
                                <div className="mt-4">
                                    <p className="font-bold">Call Us:</p>
                                    <p className="text-2xl text-primary font-playfair">{content.contact?.phone || "+91 99999 99999"}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112440.16041078721!2d76.6713757!3d28.2016259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d402377317799%3A0xc47e30776b9116c4!2sDharuhera%2C%20Haryana!5e0!3m2!1sen!2sin!4v1715560000000!5m2!1sen!2sin" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Modal */}
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="glass-card bg-white p-10 max-w-lg w-full relative"
                    >
                        <button 
                            onClick={() => setIsBookingModalOpen(false)}
                            className="absolute top-6 right-6 text-text-muted hover:text-secondary"
                        >
                            <X size={24} />
                        </button>
                        
                        <h3 className="text-3xl font-playfair mb-2">Book Your Stay</h3>
                        <p className="text-text-muted mb-8">Selected Room: <span className="text-primary font-bold">{selectedRoom?.title}</span></p>

                        <form onSubmit={handleBookingSubmit} className="grid gap-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full p-3 bg-bg-light border border-gray-200 rounded-xl outline-none focus:border-primary"
                                    required
                                    value={bookingData.guestName}
                                    onChange={(e) => setBookingData({...bookingData, guestName: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full p-3 bg-bg-light border border-gray-200 rounded-xl outline-none focus:border-primary"
                                        required
                                        value={bookingData.email}
                                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <input 
                                        type="tel" 
                                        className="w-full p-3 bg-bg-light border border-gray-200 rounded-xl outline-none focus:border-primary"
                                        required
                                        value={bookingData.phone}
                                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Check-in Date</label>
                                <input 
                                    type="date" 
                                    className="w-full p-3 bg-bg-light border border-gray-200 rounded-xl outline-none focus:border-primary"
                                    required
                                    value={bookingData.checkInDate}
                                    onChange={(e) => setBookingData({...bookingData, checkInDate: e.target.value})}
                                />
                            </div>
                            <button type="submit" className="btn-primary py-4 mt-2">Submit Request</button>
                        </form>
                    </motion.div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Home;
