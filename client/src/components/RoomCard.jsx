import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wind, Coffee, Wifi } from 'lucide-react';

const RoomCard = ({ room }) => {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden transition-all duration-300"
        >
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={room.images[0] || "https://images.unsplash.com/photo-1598928506311-c55ded91a20c"} 
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full font-bold shadow-lg">
                    ₹{room.price}/mo
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl mb-1">{room.title}</h3>
                        <p className="text-text-muted flex items-center gap-1">
                            <Users size={16} /> {room.sharingType} Sharing
                        </p>
                    </div>
                    {room.isAC && (
                        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg" title="AC Room">
                            <Wind size={20} />
                        </div>
                    )}
                </div>

                <p className="text-text-muted mb-6 line-clamp-2">
                    {room.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                    {room.amenities.slice(0, 4).map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-sm text-text-muted">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            {amenity}
                        </div>
                    ))}
                </div>

                <button className="btn-primary w-full">Book Now</button>
            </div>
        </motion.div>
    );
};

export default RoomCard;
