import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Menu, 
    X, 
    LayoutDashboard, 
    Bed, 
    MessageSquare, 
    Settings, 
    LogOut,
    Mail
} from 'lucide-react';

const AdminNavbar = ({ activeTab, setActiveTab, handleLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'content', label: 'Site Content', icon: <LayoutDashboard size={18} /> },
        { id: 'rooms', label: 'Manage Rooms', icon: <Bed size={18} /> },
        { id: 'bookings', label: 'Bookings', icon: <MessageSquare size={18} /> },
        { id: 'msgs', label: 'Messages', icon: <Mail size={18} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
    ];

    return (
        <nav className="fixed w-full z-50 transition-all duration-300 bg-white shadow-md py-3">
            <div className="container flex justify-between items-center">
                <Link to="/admin/dashboard" className="flex items-center gap-3">
                    <img src="/logo.png" alt="Sahara Logo" className="h-10 w-auto rounded-lg" />
                    <span className="text-xl font-bold font-playfair text-secondary">Admin Console</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 font-medium">
                    {navItems.map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => setActiveTab(item.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${
                                activeTab === item.id 
                                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                : 'text-text-muted hover:text-primary hover:bg-primary/5'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 transition-all border border-red-100"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
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
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-5 px-6 flex flex-col gap-3 animate-fade-in">
                    {navItems.map((item) => (
                        <button 
                            key={item.id} 
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                                activeTab === item.id 
                                ? 'bg-primary text-white' 
                                : 'text-text-muted hover:bg-bg-light'
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                    <button 
                        onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all border border-red-100"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default AdminNavbar;
