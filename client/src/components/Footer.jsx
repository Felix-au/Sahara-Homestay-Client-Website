import React, { useState, useEffect } from 'react';
import { Home, Mail, Phone, Menu, X, Share2, Camera, Send } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-16 pb-8">
            <div className="container">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                                <Home size={24} />
                            </div>
                            <span className="text-2xl font-bold font-playfair">Sahara</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Premium homestay living in the heart of Dharuhera. Quality rooms, modern amenities, and a peaceful environment.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                                <Camera size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                                <Share2 size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                                <Send size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xl mb-6">Quick Links</h4>
                        <ul className="flex flex-col gap-4 text-gray-400">
                            <li><a href="#home" className="hover:text-primary">Home</a></li>
                            <li><a href="#rooms" className="hover:text-primary">Our Rooms</a></li>
                            <li><a href="#amenities" className="hover:text-primary">Amenities</a></li>
                            <li><a href="#gallery" className="hover:text-primary">Gallery</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl mb-6">Services</h4>
                        <ul className="flex flex-col gap-4 text-gray-400">
                            <li>Single Sharing</li>
                            <li>Double Sharing</li>
                            <li>Triple Sharing</li>
                            <li>AC & Non-AC Rooms</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xl mb-6">Contact Info</h4>
                        <ul className="flex flex-col gap-4 text-gray-400">
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-primary" />
                                +91 7300048228
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-primary" />
                                saharahomestay.dhr@gmail.com
                            </li>
                            <li className="flex items-start gap-3">
                                <Home size={18} className="text-primary mt-1" />
                                Plot No 116 Sector 6 Near Primary Govt School Dharuehra Rewari Haryana 123106
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Sahara Homestay. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
