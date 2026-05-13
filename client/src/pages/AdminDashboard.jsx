import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Bed, 
    MessageSquare, 
    Settings, 
    LogOut, 
    Plus, 
    Edit, 
    Trash2, 
    Check, 
    X,
    Save
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('content');
    const [rooms, setRooms] = useState([]);
    const [content, setContent] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditingContent, setIsEditingContent] = useState(null);
    const [editData, setEditData] = useState({});
    const navigate = useNavigate();

    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) {
            navigate('/admin');
            return;
        }
        fetchData();
    }, [token]);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const [roomsRes, contentRes, bookingsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/rooms'),
                axios.get('http://localhost:5000/api/content'),
                axios.get('http://localhost:5000/api/bookings', config)
            ]);
            setRooms(roomsRes.data);
            setContent(contentRes.data);
            setBookings(bookingsRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const updateContent = async (section, data) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`http://localhost:5000/api/content/${section}`, data, config);
            setIsEditingContent(null);
            fetchData();
        } catch (error) {
            alert("Error updating content");
        }
    };

    const deleteRoom = async (id) => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`http://localhost:5000/api/rooms/${id}`, config);
                fetchData();
            } catch (error) {
                alert("Error deleting room");
            }
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading Dashboard...</div>;

    return (
        <div className="flex h-screen bg-bg-light">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary text-white p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white">S</div>
                    <span className="text-xl font-bold font-playfair">Admin Console</span>
                </div>

                <nav className="flex flex-col gap-2 flex-grow">
                    <button 
                        onClick={() => setActiveTab('content')}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'content' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <LayoutDashboard size={20} />
                        Site Content
                    </button>
                    <button 
                        onClick={() => setActiveTab('rooms')}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'rooms' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <Bed size={20} />
                        Manage Rooms
                    </button>
                    <button 
                        onClick={() => setActiveTab('bookings')}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === 'bookings' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-white/5'}`}
                    >
                        <MessageSquare size={20} />
                        Bookings
                    </button>
                </nav>

                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-auto"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-grow p-10 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-4xl font-playfair capitalize">{activeTab.replace('-', ' ')}</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-text-muted">Welcome, Admin</span>
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">A</div>
                    </div>
                </header>

                {/* Content Management Tab */}
                {activeTab === 'content' && (
                    <div className="grid gap-8">
                        {content.map((item) => (
                            <div key={item._id} className="glass-card p-8 bg-white">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-playfair capitalize">{item.section} Section</h3>
                                    {isEditingContent === item.section ? (
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => updateContent(item.section, editData)}
                                                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                            >
                                                <Save size={20} />
                                            </button>
                                            <button 
                                                onClick={() => setIsEditingContent(null)}
                                                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => {
                                                setIsEditingContent(item.section);
                                                setEditData(item.data);
                                            }}
                                            className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                                        >
                                            <Edit size={20} />
                                        </button>
                                    )}
                                </div>

                                <div className="grid gap-4">
                                    {Object.keys(item.data).map((key) => (
                                        <div key={key}>
                                            <label className="block text-sm font-medium text-text-muted mb-1 capitalize">{key}</label>
                                            {isEditingContent === item.section ? (
                                                <input 
                                                    type="text"
                                                    className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary outline-none"
                                                    value={editData[key] || ''}
                                                    onChange={(e) => setEditData({...editData, [key]: e.target.value})}
                                                />
                                            ) : (
                                                <p className="p-3 bg-bg-light rounded-lg text-text-main">{item.data[key]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Rooms Management Tab */}
                {activeTab === 'rooms' && (
                    <div className="grid gap-6">
                        <button className="btn-primary flex items-center gap-2 self-start mb-4">
                            <Plus size={20} /> Add New Room
                        </button>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms.map((room) => (
                                <div key={room._id} className="glass-card bg-white p-6">
                                    <div className="h-40 rounded-xl overflow-hidden mb-4">
                                        <img src={room.images[0]} className="w-full h-full object-cover" />
                                    </div>
                                    <h4 className="text-xl mb-2">{room.title}</h4>
                                    <p className="text-primary font-bold mb-4">₹{room.price}/month</p>
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg"><Edit size={20} /></button>
                                        <button 
                                            onClick={() => deleteRoom(room._id)}
                                            className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                                        ><Trash2 size={20} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="glass-card bg-white overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-bg-light border-b border-gray-100">
                                <tr>
                                    <th className="p-4 font-semibold">Guest</th>
                                    <th className="p-4 font-semibold">Room</th>
                                    <th className="p-4 font-semibold">Check-In</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking._id} className="border-b border-gray-50 hover:bg-bg-light/50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-medium">{booking.guestName}</div>
                                            <div className="text-xs text-text-muted">{booking.phone}</div>
                                        </td>
                                        <td className="p-4">{booking.room?.title}</td>
                                        <td className="p-4 text-sm">{new Date(booking.checkInDate).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 
                                                booking.status === 'Cancelled' ? 'bg-red-100 text-red-600' : 
                                                'bg-yellow-100 text-yellow-600'
                                            }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            <button className="p-1 text-green-600 hover:bg-green-50 rounded"><Check size={18} /></button>
                                            <button className="p-1 text-red-600 hover:bg-red-50 rounded"><X size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
