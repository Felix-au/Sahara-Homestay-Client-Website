import React from 'react';
import { motion } from 'framer-motion';
import { Users, Wind, Coffee, Wifi, ThermometerSnowflake, Sun } from 'lucide-react';

const RoomCard = ({ room, onBook }) => {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="glass-card overflow-hidden transition-all duration-300"
        >
            <div className="relative h-64 overflow-hidden">
                <img 
                    src={room.images[0]} 
                    alt={room.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl mb-1">{room.title}</h3>
                        <p className="text-text-muted flex items-center gap-1">
                            <Users size={16} /> {room.sharingType} Sharing
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mb-6 bg-bg-light p-3 rounded-xl">
                    <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-sm font-medium">
                            <Sun size={16} className="text-orange-500" /> With Cooler
                        </span>
                        <span className="text-primary font-bold">₹{room.priceCooler}/mo</span>
                    </div>
                    {room.priceAC > 0 && (
                        <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                            <span className="flex items-center gap-2 text-sm font-medium">
                                <ThermometerSnowflake size={16} className="text-blue-500" /> With AC
                            </span>
                            <span className="text-primary font-bold">₹{room.priceAC}/mo</span>
                        </div>
                    )}
                </div>

                <p className="text-text-muted mb-6 text-sm">
                    {room.description}
                </p>

                <button 
                    onClick={onBook}
                    className="btn-primary w-full"
                >
                    Book Now
                </button>
            </div>
        </motion.div>
    );
};

export default RoomCard;
