import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';
import { API_BASE_URL } from '../config';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [phone, setPhone] = useState('+91 7300048228'); // Fallback

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Fetch phone number
        fetch(`${API_BASE_URL}/content/contact`)
            .then(res => res.json())
            .then(data => {
                if (data.data?.phone) setPhone(data.data.phone);
            })
            .catch(err => console.error("Error fetching contact phone", err));

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-md shadow-sm py-5'}`}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="Sahara Logo" className="h-10 w-auto rounded-lg" />
                    <span className="text-xl font-bold font-playfair text-secondary">Sahara Homestay</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium">
                    {['Home', 'Rooms', 'Amenities', 'Gallery', 'Contact'].map((item) => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase()}`} 
                            className="hover:text-primary transition-colors text-text-main"
                        >
                            {item}
                        </a>
                    ))}
                    <a href={`tel:${phone}`} className="btn-primary flex items-center gap-2">
                        Call Now: {phone}
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className="md:hidden text-secondary"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-5 px-6 flex flex-col gap-4 animate-fade-in">
                    {['Home', 'Rooms', 'Amenities', 'Gallery', 'Contact'].map((item) => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase()}`} 
                            className="text-secondary text-lg font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <a href={`tel:${phone}`} className="btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>Call Now: {phone}</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
