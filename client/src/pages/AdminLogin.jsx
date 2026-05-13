import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { Lock, User, AlertCircle } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
                username,
                password
            });
            
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('adminInfo', JSON.stringify(data));
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-bg-dark relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[60%] bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[50%] bg-accent/10 rounded-full blur-3xl"></div>

            <div className="container px-4 sm:max-w-md relative z-10">
                <div className="glass-card p-6 sm:p-10 bg-white/5 border-white/10 backdrop-blur-xl shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-3xl text-white font-playfair mb-2">Admin Portal</h2>
                        <p className="text-gray-400">Secure access to Sahara Homestay CMS</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3 mb-6 animate-shake">
                            <AlertCircle size={20} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col gap-6">
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input 
                                type="text" 
                                placeholder="Username"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input 
                                type="password" 
                                placeholder="Password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-primary outline-none transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="btn-primary py-4 text-lg font-bold disabled:opacity-50"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <a href="/" className="text-gray-500 hover:text-primary transition-colors">Back to Website</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
