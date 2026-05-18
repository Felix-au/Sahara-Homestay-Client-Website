import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RoomCard from '../components/RoomCard';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';

const Home = () => {
    const [rooms, setRooms] = useState([]);
    const [content, setContent] = useState({});
    const [clients, setClients] = useState([]);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [bookingData, setBookingData] = useState({ guestName: '', email: '', phone: '', checkInDate: '' });
    
    // Contact form state
    const [messageData, setMessageData] = useState({ guestName: '', email: '', phone: '', message: '' });
    const [msgStatus, setMsgStatus] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomsRes = await axios.get(`${API_BASE_URL}/rooms`);
                const contentRes = await axios.get(`${API_BASE_URL}/content`);
                const clientsRes = await axios.get(`${API_BASE_URL}/clients`);
                
                setRooms(roomsRes.data);
                setClients(clientsRes.data);
                
                const contentObj = {};
                contentRes.data.forEach(item => {
                    contentObj[item.section] = item.data;
                });
                setContent(contentObj);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleBookingClick = (room) => {
        setSelectedRoom(room);
        setIsBookingModalOpen(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/bookings`, {
                ...bookingData,
                room: selectedRoom._id
            });
            alert('Booking request submitted! We will contact you soon.');
            setIsBookingModalOpen(false);
            setBookingData({ guestName: '', email: '', phone: '', checkInDate: '' });
        } catch (error) {
            alert('Error submitting booking');
        }
    };

    const handleWhatsAppSubmit = () => {
        const cleanPhone = content.contact?.phone?.replace(/\s+/g, '').replace(/[+-]/g, '') || '917300048228';
        const text = `Hi, I am interested in booking:
Room: ${selectedRoom.title}
Guest Name: ${bookingData.guestName}
Phone: ${bookingData.phone}
Check-in Date: ${bookingData.checkInDate}`;
        
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/${cleanPhone}?text=${encodedText}`, '_blank');
    };

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        setMsgStatus('Sending...');
        try {
            await axios.post(`${API_BASE_URL}/messages`, messageData);
            setMsgStatus('Message sent successfully!');
            setMessageData({ guestName: '', email: '', phone: '', message: '' });
            setTimeout(() => setMsgStatus(''), 3000);
        } catch (error) {
            setMsgStatus('Error sending message. Try again.');
        }
    };

    return (
        <>
            <Navbar />
            <Hero content={content.hero} testimonials={content.testimonials} />

            {/* Rooms Section */}
            <section id="rooms" className="bg-bg-light">
                <div className="container">
                    <div className="section-title">
                        <h2>Our Rooms</h2>
                        <p className="text-text-muted">Choose the perfect living space for your needs</p>
                        <div className="underline"></div>
                    </div>

                    <div className="responsive-dynamic-grid" style={{ '--cols': content.rooms_config?.columns || 3 }}>
                        {rooms.map((room) => (
                            <RoomCard key={room._id} room={room} onBook={() => handleBookingClick(room)} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            {content.gallery && content.gallery.images && (
                <section id="gallery" className="bg-white">
                    <div className="container">
                        <div className="section-title">
                            <h2>Gallery</h2>
                            <div className="underline"></div>
                        </div>
                        <div className="responsive-dynamic-grid" style={{ '--cols': content.gallery.columns || 4 }}>
                            {content.gallery.images.map((img, idx) => (
                                <div key={idx} className="gallery-item">
                                    <img src={img} alt={`Gallery ${idx + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Dynamic Locations Section */}
            {content.locations && content.locations.maps && (
                <section id="locations" className="bg-bg-light">
                    <div className="container">
                        <div className="section-title">
                            <h2>Places You Will Find Us</h2>
                            <div className="underline"></div>
                        </div>
                        <div className="responsive-dynamic-grid" style={{ '--cols': content.locations.columns || 2 }}>
                            {content.locations.maps.map((mapHtml, idx) => (
                                <div key={idx} className="h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white" dangerouslySetInnerHTML={{ __html: mapHtml }}>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Amenities Section */}
            <section id="amenities" className="bg-white">
                <div className="container">
                    <div className="section-title">
                        <h2>World-Class Amenities</h2>
                        <div className="underline"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 text-center">
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

            {/* Contact Section */}
            <section id="contact" className="bg-bg-light">
                <div className="container">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-playfair mb-6">Contact Us</h2>
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h4 className="text-primary text-xl mb-2">Location</h4>
                                    <p className="text-text-muted">{content.contact?.address}</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                    <div>
                                        <h4 className="text-primary text-xl mb-2">Phone</h4>
                                        <p className="text-text-muted">{content.contact?.phone}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-primary text-xl mb-2">Email</h4>
                                        <p className="text-text-muted">{content.contact?.email}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-primary text-xl mb-2">Working Time</h4>
                                    <p className="text-text-muted">{content.contact?.workingTime}</p>
                                </div>
                            </div>
                        </div>
                        <div className="glass-card p-6 md:p-10 bg-white">
                            <h3 className="text-2xl mb-6">Send Message</h3>
                            <form className="flex flex-col gap-4" onSubmit={handleMessageSubmit}>
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    className="p-4 bg-bg-light border border-gray-200 rounded-xl outline-none"
                                    required
                                    value={messageData.guestName}
                                    onChange={e => setMessageData({...messageData, guestName: e.target.value})}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input 
                                        type="tel" 
                                        placeholder="Phone" 
                                        className="p-4 bg-bg-light border border-gray-200 rounded-xl outline-none"
                                        required
                                        value={messageData.phone}
                                        onChange={e => setMessageData({...messageData, phone: e.target.value})}
                                    />
                                    <input 
                                        type="email" 
                                        placeholder="Email (Optional)" 
                                        className="p-4 bg-bg-light border border-gray-200 rounded-xl outline-none"
                                        value={messageData.email}
                                        onChange={e => setMessageData({...messageData, email: e.target.value})}
                                    />
                                </div>
                                <textarea 
                                    placeholder="Message" 
                                    className="p-4 bg-bg-light border border-gray-200 rounded-xl outline-none h-32"
                                    required
                                    value={messageData.message}
                                    onChange={e => setMessageData({...messageData, message: e.target.value})}
                                ></textarea>
                                <button type="submit" className="btn-primary">Send Now</button>
                                {msgStatus && <p className="text-sm text-center mt-2 text-primary">{msgStatus}</p>}
                            </form>
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
                        className="glass-card bg-white p-6 md:p-10 max-w-lg w-full relative overflow-y-auto max-h-[90vh]"
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
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-1">Phone</label>
                                    <input 
                                        type="tel" 
                                        className="w-full p-3 bg-bg-light border border-gray-200 rounded-xl outline-none focus:border-primary"
                                        required
                                        value={bookingData.phone}
                                        onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        className="w-full p-3 bg-bg-light border border-gray-200 rounded-xl outline-none focus:border-primary"
                                        required
                                        value={bookingData.email}
                                        onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
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
                            <div className="flex flex-col gap-3">
                                <button type="submit" className="btn-primary py-4">Submit Request</button>
                                <button type="button" onClick={handleWhatsAppSubmit} className="btn-whatsapp py-4 justify-center">
                                    <MessageCircle size={20} /> Submit via WhatsApp
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Floating WhatsApp Button */}
            <a href={`https://wa.me/${content.contact?.phone?.replace(/\s+/g, '').replace(/[+-]/g, '') || '917300048228'}`} target="_blank" rel="noopener noreferrer" className="whatsapp-float">
                <MessageCircle size={35} />
            </a>

            {/* Sticky Bottom Clients Strip + Copyright */}
            <div className="clients-strip">
                {clients.length > 0 && (
                    <div className="clients-track-row">
                        <span className="clients-label">Our Clients</span>
                        <div className="clients-track-container">
                            <div className="clients-track">
                                {[...clients, ...clients, ...clients].map((c, idx) => (
                                    <div key={idx} className="client-item">
                                        {c.logo && (
                                            <img 
                                                src={c.logo} 
                                                alt={c.text || 'Client Logo'} 
                                                className="client-logo"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        )}
                                        {c.text && <span className="client-text">{c.text}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <span className="clients-copyright">© {new Date().getFullYear()} Sahara Homestay. All rights reserved.</span>
            </div>

            <Footer />
        </>
    );
};

export default Home;
