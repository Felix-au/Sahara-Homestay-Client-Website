import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ content, testimonials }) => {
    return (
        <section id="home" className="relative h-screen flex items-center overflow-hidden pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img 
                    src={content?.image || "/herosectionimg.jpeg"} 
                    alt="Hero Background" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent"></div>
            </div>

            <div className="container relative z-10">
                <div className="max-w-2xl">
                    <motion.h1 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-white text-5xl md:text-7xl font-playfair leading-tight mb-6"
                    >
                        {content?.title || "Find comfort in your home away from home"}
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-300 text-lg md:text-xl mb-10 max-w-lg"
                    >
                        {content?.subtitle || "Experience premium homestay living in Dharuhera with state-of-the-art facilities."}
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                    >
                        <a href="#rooms" className="btn-primary">View Rooms</a>
                        <a href="#contact" className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-secondary transition-all">Contact Us</a>
                    </motion.div>

                    {/* Rolling Testimonials */}
                    {testimonials && testimonials.items && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="mt-16 p-6 glass-card bg-white/5 border-white/10 max-w-md"
                        >
                            <div className="testimonial-container">
                                <div className="testimonial-track">
                                    {testimonials.items.map((t, idx) => (
                                        <div key={idx} className="testimonial-item">
                                            <p className="text-gray-300 italic mb-2">"{t.text}"</p>
                                            <p className="text-primary font-bold">— {t.name}</p>
                                        </div>
                                    ))}
                                    {/* Duplicate first item for seamless loop */}
                                    <div className="testimonial-item">
                                        <p className="text-gray-300 italic mb-2">"{testimonials.items[0].text}"</p>
                                        <p className="text-primary font-bold">— {testimonials.items[0].name}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white opacity-50 hidden md:block"
            >
                <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;
