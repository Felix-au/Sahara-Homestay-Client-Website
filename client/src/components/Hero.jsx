import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ content }) => {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2000" 
                    alt="Luxury Homestay" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
            </div>

            <div className="container relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl md:text-7xl font-playfair mb-6 leading-tight">
                        {content?.title || "Find comfort in your home away from home"}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-light opacity-90">
                        {content?.subtitle || "Experience premium homestay living with state-of-the-art facilities and unparalleled hospitality."}
                    </p>
                    <div className="flex justify-center gap-6">
                        <a href="#rooms" className="btn-primary">View Rooms</a>
                        <a href="#contact" className="px-8 py-3 rounded-full border-2 border-white font-semibold hover:bg-white hover:text-secondary transition-all">Contact Us</a>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white opacity-70"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
