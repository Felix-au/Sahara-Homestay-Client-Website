import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                        <Home size={24} />
                    </div>
                    <span className={`text-xl font-bold font-playfair ${isScrolled ? 'text-secondary' : 'text-white'}`}>Sahara Homestay</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium">
                    {['Home', 'Rooms', 'Amenities', 'Gallery', 'Contact'].map((item) => (
                        <a 
                            key={item} 
                            href={`#${item.toLowerCase()}`} 
                            className={`hover:text-primary transition-colors ${isScrolled ? 'text-text-main' : 'text-white'}`}
                        >
                            {item}
                        </a>
                    ))}
                    <Link to="/admin" className="btn-primary">Admin</Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    className={`md:hidden ${isScrolled ? 'text-secondary' : 'text-white'}`}
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
                    <Link to="/admin" className="btn-primary text-center" onClick={() => setIsMobileMenuOpen(false)}>Admin Login</Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
