import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ content, testimonials }) => {
    return (
        <section id="home" className="pt-32 pb-16 bg-white">
            <div className="container">
                {/* Header Text - Centered at Top */}
                <br></br><br></br>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-playfair leading-tight mb-6"
                    >
                        Find comfort in your <span className="text-primary">home</span> <span className="text-primary">away</span> from home
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-text-muted text-lg md:text-xl"
                    >
                        {content?.subtitle || "Experience comfortable living with modern amenities and a welcoming community at Sahara Home Stay Accommodation."}
                    </motion.p>
                </div>

                {/* Two Columns Grid */}
                <div className="grid md:grid-cols-2 gap-12 items-stretch">
                    {/* Left Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[500px]"
                    >
                        <img
                            src={content?.image || "/herosectionimg.jpeg"}
                            alt="Hero"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Right Column: Rolling Testimonials */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-accent/5 rounded-3xl p-8 flex flex-col justify-center border border-primary/10 h-[400px] md:h-[500px]"
                    >
                        {testimonials && testimonials.items && (
                            <div className="relative overflow-hidden h-full">
                                <div className="flex flex-col gap-6 animate-scroll-vertical">
                                    {testimonials.items.map((t, idx) => (
                                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
                                                    {t.image ? (
                                                        <img src={t.image} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-primary font-bold">{t.name?.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <span className="font-bold">{t.name}</span>
                                            </div>
                                            <p className="text-text-muted italic">"{t.text}"</p>
                                        </div>
                                    ))}
                                    {/* Duplicate first few for loop */}
                                    {testimonials.items.slice(0, 2).map((t, idx) => (
                                        <div key={`loop-${idx}`} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
                                                    {t.image ? (
                                                        <img src={t.image} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-primary font-bold">{t.name?.charAt(0)}</span>
                                                    )}
                                                </div>
                                                <span className="font-bold">{t.name}</span>
                                            </div>
                                            <p className="text-text-muted italic">"{t.text}"</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
