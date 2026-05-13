import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
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
    Save,
    Image as ImageIcon,
    MapPin,
    Quote,
    Upload,
    Mail
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('content');
    const [rooms, setRooms] = useState([]);
    const [content, setContent] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditingContent, setIsEditingContent] = useState(null);
    const [editData, setEditData] = useState({});
    const [uploading, setUploading] = useState(false);
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [credentialMsg, setCredentialMsg] = useState({ type: '', text: '' });
    const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState(null);
    const [roomFormData, setRoomFormData] = useState({
        title: '',
        priceCooler: '',
        priceAC: '',
        sharingType: 'Single',
        description: '',
        amenities: '',
        images: []
    });
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
            const [roomsRes, contentRes, bookingsRes, messagesRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/rooms`),
                axios.get(`${API_BASE_URL}/content`),
                axios.get(`${API_BASE_URL}/bookings`, config),
                axios.get(`${API_BASE_URL}/messages`, config)
            ]);
            setRooms(roomsRes.data);
            setContent(contentRes.data);
            setBookings(bookingsRes.data);
            setMessages(messagesRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false); // Stop loading even if some data failed
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

    const handleImageUpload = async (e, callback) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            const config = { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                } 
            };
            const { data } = await axios.post(`${API_BASE_URL}/upload`, formData, config);
            callback(data.url);
        } catch (error) {
            alert("Upload failed: " + (error.response?.data?.message || error.message));
        } finally {
            setUploading(false);
        }
    };

    const handleUpdateCredentials = async (e) => {
        e.preventDefault();
        setCredentialMsg({ type: '', text: '' });
        
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const { data } = await axios.put(`${API_BASE_URL}/auth/update`, credentials, config);
            setCredentialMsg({ type: 'success', text: data.message });
            setCredentials({ username: '', password: '' });
            // Update username in local display if it was changed
            if (credentials.username) {
                // You might want to update local storage or user state here if needed
            }
        } catch (error) {
            setCredentialMsg({ type: 'error', text: error.response?.data?.message || 'Update failed' });
        }
    };

    const updateContent = async (section, data) => {
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`${API_BASE_URL}/content/${section}`, data, config);
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
                await axios.delete(`${API_BASE_URL}/rooms/${id}`, config);
                fetchData();
            } catch (error) {
                alert("Error deleting room");
            }
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };
                await axios.delete(`${API_BASE_URL}/messages/${id}`, config);
                fetchData();
            } catch (error) {
                alert("Error deleting message");
            }
        }
    };

    const handleSaveRoom = async (e) => {
        e.preventDefault();
        try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const data = {
                ...roomFormData,
                amenities: roomFormData.amenities.split(',').map(a => a.trim())
            };

            if (editingRoom) {
                await axios.put(`${API_BASE_URL}/rooms/${editingRoom._id}`, data, config);
            } else {
                await axios.post(`${API_BASE_URL}/rooms`, data, config);
            }
            setIsRoomModalOpen(false);
            fetchData();
        } catch (error) {
            alert("Error saving room");
        }
    };

    const openAddRoomModal = () => {
        setEditingRoom(null);
        setRoomFormData({
            title: '',
            priceCooler: '',
            priceAC: '',
            sharingType: 'Single',
            description: '',
            amenities: '',
            images: []
        });
        setIsRoomModalOpen(true);
    };

    const openEditRoomModal = (room) => {
        setEditingRoom(room);
        setRoomFormData({
            title: room.title,
            priceCooler: room.priceCooler,
            priceAC: room.priceAC,
            sharingType: room.sharingType,
            description: room.description || '',
            amenities: room.amenities.join(', '),
            images: room.images
        });
        setIsRoomModalOpen(true);
    };

    if (loading) return <div className="h-screen flex items-center justify-center">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-bg-light">
            <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

            {/* Main Content */}
            <main className="container pt-20 pb-10 px-4 md:px-6">
                <header className="flex justify-between items-center mb-6 md:mb-10">
                    <h1 className="text-2xl md:text-4xl font-playfair capitalize">{activeTab === 'msgs' ? 'Contact Messages' : activeTab.replace('-', ' ')}</h1>
                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="hidden sm:block text-text-muted text-sm">Welcome, Admin</span>
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">A</div>
                    </div>
                </header>

                {/* Content Management Tab */}
                {activeTab === 'content' && (
                    <div className="grid gap-8">
                        {content.filter(item => item.section !== 'rooms_config').map((item) => (
                            <div key={item._id} className="glass-card p-4 md:p-8 bg-white">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl md:text-2xl font-playfair capitalize">{item.section.replace('_', ' ')} Section</h3>
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
                                    {item.section === 'hero' && (
                                        <div className="grid gap-4">
                                            <input type="text" className="w-full p-3 border rounded-lg" value={isEditingContent === 'hero' ? editData.title : item.data.title} onChange={e => setEditData({...editData, title: e.target.value})} placeholder="Title" disabled={isEditingContent !== 'hero'} />
                                            <input type="text" className="w-full p-3 border rounded-lg" value={isEditingContent === 'hero' ? editData.subtitle : item.data.subtitle} onChange={e => setEditData({...editData, subtitle: e.target.value})} placeholder="Subtitle" disabled={isEditingContent !== 'hero'} />
                                            <div className="flex items-center gap-4">
                                                <img src={isEditingContent === 'hero' ? editData.image : item.data.image} className="admin-image" />
                                                {isEditingContent === 'hero' && (
                                                    <input type="file" onChange={e => handleImageUpload(e, url => setEditData({...editData, image: url}))} />
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {item.section === 'gallery' && (
                                        <div className="grid gap-4">
                                            <div className="flex items-center gap-4">
                                                <label>Columns:</label>
                                                <input type="number" className="p-2 border rounded w-20" value={isEditingContent === 'gallery' ? editData.columns : item.data.columns} onChange={e => setEditData({...editData, columns: e.target.value})} disabled={isEditingContent !== 'gallery'} />
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                                {(isEditingContent === 'gallery' ? editData.images : item.data.images).map((img, idx) => (
                                                    <div key={idx} className="relative group">
                                                        <img src={img} className="admin-gallery-image w-full h-auto" />
                                                        {isEditingContent === 'gallery' && (
                                                            <button onClick={() => setEditData({...editData, images: editData.images.filter((_, i) => i !== idx)})} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"><X size={12} /></button>
                                                        )}
                                                    </div>
                                                ))}
                                                {isEditingContent === 'gallery' && (
                                                    <label className="border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-gray-50 h-32">
                                                        <Upload size={24} className="text-gray-400" />
                                                        <input type="file" className="hidden" onChange={e => handleImageUpload(e, url => setEditData({...editData, images: [...editData.images, url]}))} />
                                                    </label>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {item.section === 'locations' && (
                                        <div className="grid gap-4">
                                             <div className="flex items-center gap-4">
                                                <label>Columns:</label>
                                                <input type="number" className="p-2 border rounded w-20" value={isEditingContent === 'locations' ? editData.columns : item.data.columns} onChange={e => setEditData({...editData, columns: e.target.value})} disabled={isEditingContent !== 'locations'} />
                                            </div>
                                            <div className="grid gap-4">
                                                {(isEditingContent === 'locations' ? editData.maps : item.data.maps).map((mapHtml, idx) => (
                                                    <div key={idx} className="flex gap-4 items-start">
                                                        <div className="flex-grow">
                                                            <textarea className="w-full p-2 border rounded text-xs h-20 mb-2" value={mapHtml} onChange={e => {
                                                                const newMaps = [...editData.maps];
                                                                newMaps[idx] = e.target.value;
                                                                setEditData({...editData, maps: newMaps});
                                                            }} disabled={isEditingContent !== 'locations'} />
                                                            <div className="h-20 w-full overflow-hidden border rounded bg-gray-50 text-[8px]" dangerouslySetInnerHTML={{ __html: mapHtml.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"') }}></div>
                                                        </div>
                                                        {isEditingContent === 'locations' && (
                                                            <button onClick={() => setEditData({...editData, maps: editData.maps.filter((_, i) => i !== idx)})} className="p-2 bg-red-100 text-red-500 rounded"><Trash2 size={16} /></button>
                                                        )}
                                                    </div>
                                                ))}
                                                {isEditingContent === 'locations' && (
                                                    <button onClick={() => setEditData({...editData, maps: [...editData.maps, '']})} className="btn-primary self-start text-xs py-2 px-4">Add Map Embed</button>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {item.section === 'testimonials' && (
                                        <div className="grid gap-4">
                                            {(isEditingContent === 'testimonials' ? editData.items : item.data.items).map((t, idx) => (
                                                <div key={idx} className="p-4 border rounded-xl bg-gray-50 flex gap-4 items-start">
                                                    <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/20 flex-shrink-0 relative group">
                                                        {t.image ? (
                                                            <img src={t.image} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-primary font-bold text-xl">
                                                                {t.name?.charAt(0) || '?'}
                                                            </div>
                                                        )}
                                                        {isEditingContent === 'testimonials' && (
                                                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                                                                <Upload size={16} className="text-white" />
                                                                <input type="file" className="hidden" onChange={e => handleImageUpload(e, url => {
                                                                    const newItems = [...editData.items];
                                                                    newItems[idx] = { ...newItems[idx], image: url };
                                                                    setEditData({...editData, items: newItems});
                                                                })} />
                                                            </label>
                                                        )}
                                                    </div>
                                                    <div className="flex-grow grid gap-2">
                                                        <input 
                                                            type="text" 
                                                            className="w-full p-2 border rounded" 
                                                            value={t.name} 
                                                            placeholder="Guest Name"
                                                            onChange={e => {
                                                                const newItems = [...editData.items];
                                                                newItems[idx] = { ...newItems[idx], name: e.target.value };
                                                                setEditData({...editData, items: newItems});
                                                            }}
                                                            disabled={isEditingContent !== 'testimonials'}
                                                        />
                                                        <textarea 
                                                            className="w-full p-2 border rounded h-20" 
                                                            value={t.text} 
                                                            placeholder="Testimonial Text"
                                                            onChange={e => {
                                                                const newItems = [...editData.items];
                                                                newItems[idx] = { ...newItems[idx], text: e.target.value };
                                                                setEditData({...editData, items: newItems});
                                                            }}
                                                            disabled={isEditingContent !== 'testimonials'}
                                                        />
                                                    </div>
                                                    {isEditingContent === 'testimonials' && (
                                                        <button onClick={() => setEditData({...editData, items: editData.items.filter((_, i) => i !== idx)})} className="p-2 bg-red-100 text-red-500 rounded"><Trash2 size={16} /></button>
                                                    )}
                                                </div>
                                            ))}
                                            {isEditingContent === 'testimonials' && (
                                                <button onClick={() => setEditData({...editData, items: [...editData.items, { name: '', text: '', image: '' }]})} className="btn-primary self-start text-xs py-2 px-4">Add Testimonial</button>
                                            )}
                                        </div>
                                    )}

                                    {/* Default Generic Editor */}
                                    {['hero', 'gallery', 'locations', 'testimonials', 'rooms_config'].indexOf(item.section) === -1 && (
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
                                                        <p className="p-3 bg-bg-light rounded-lg text-text-main">
                                                            {typeof item.data[key] === 'object' ? JSON.stringify(item.data[key]) : item.data[key]}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Rooms Management Tab */}
                {activeTab === 'rooms' && (
                    <div className="grid gap-6">
                        <div className="glass-card bg-white p-4 md:p-8 mb-6">
                            <h3 className="text-xl md:text-2xl font-playfair mb-4 md:mb-6">Room Display Configuration</h3>
                            {content.find(c => c.section === 'rooms_config') && (
                                <div className="flex flex-wrap items-center gap-3">
                                    <label className="font-medium text-sm md:text-base">Home Page Grid Columns:</label>
                                    <input 
                                        type="number" 
                                        className="p-3 border rounded-xl w-20 outline-none focus:border-primary" 
                                        defaultValue={content.find(c => c.section === 'rooms_config').data.columns}
                                        onChange={e => updateContent('rooms_config', { columns: parseInt(e.target.value) })}
                                    />
                                    <span className="text-xs text-text-muted">(Auto-saved on change)</span>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={openAddRoomModal}
                            className="btn-primary flex items-center gap-2 self-start mb-4"
                        >
                            <Plus size={20} /> Add New Room
                        </button>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rooms.map((room) => (
                                <div key={room._id} className="glass-card bg-white p-6">
                                    <div className="h-40 rounded-xl overflow-hidden mb-4 relative">
                                        <img src={room.images[0]} className="w-full h-full object-cover admin-image" />
                                        <label className="absolute bottom-2 right-2 bg-black/50 text-white p-2 rounded-full cursor-pointer hover:bg-black/70">
                                            <Upload size={16} />
                                            <input type="file" className="hidden" onChange={e => handleImageUpload(e, url => {
                                                const config = { headers: { Authorization: `Bearer ${token}` } };
                                                axios.put(`${API_BASE_URL}/rooms/${room._id}`, { images: [url] }, config).then(fetchData);
                                            })} />
                                        </label>
                                    </div>
                                    <h4 className="text-xl mb-2">{room.title}</h4>
                                    <p className="text-sm text-text-muted mb-4 line-clamp-2">{room.description}</p>
                                    <div className="flex justify-between text-sm mb-4 bg-bg-light p-2 rounded">
                                        <span>Cooler: ₹{room.priceCooler}</span>
                                        <span>AC: ₹{room.priceAC}</span>
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => openEditRoomModal(room)}
                                            className="p-2 text-primary hover:bg-primary/10 rounded-lg"
                                        ><Edit size={20} /></button>
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
                        <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
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
                    </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'msgs' && (
                    <div className="grid gap-6">
                        {messages.length === 0 ? (
                            <div className="text-center p-20 glass-card bg-white">
                                <Mail size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-text-muted">No messages received yet.</p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {messages.map((msg) => (
                                    <div key={msg._id} className="glass-card bg-white p-4 md:p-6 flex flex-col md:flex-row justify-between items-start gap-4">
                                        <div className="flex-grow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="text-xl font-bold">{msg.guestName}</h4>
                                                <span className="text-xs text-text-muted bg-bg-light px-2 py-1 rounded">
                                                    {new Date(msg.createdAt).toLocaleString()}
                                                </span>
                                            </div>
                                            <div className="flex gap-4 text-sm mb-4">
                                                <span className="text-primary font-medium">{msg.phone}</span>
                                                <span className="text-text-muted">{msg.email || 'No Email'}</span>
                                            </div>
                                            <p className="text-text-main bg-bg-light p-4 rounded-xl border border-gray-100 italic">
                                                "{msg.message}"
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => deleteMessage(msg._id)}
                                            className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Admin Settings Tab */}
                {activeTab === 'settings' && (
                    <div className="max-w-2xl mx-auto">
                        <div className="glass-card p-4 md:p-8 bg-white shadow-xl rounded-2xl border border-primary/10">
                            <h2 className="text-2xl md:text-3xl font-playfair mb-4 md:mb-6 flex items-center gap-3">
                                <Settings className="text-primary" /> 
                                Update Admin Credentials
                            </h2>
                            
                            <p className="text-text-muted mb-8 italic">
                                Use this section to update your login credentials. Changes will take effect immediately.
                            </p>
                            <form onSubmit={handleUpdateCredentials} className="grid gap-6">
                                {credentialMsg.text && (
                                    <div className={`p-4 rounded-xl text-sm ${credentialMsg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {credentialMsg.text}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 px-1">New Username (Optional)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <LayoutDashboard size={18} className="text-gray-400" />
                                        </div>
                                        <input 
                                            type="text" 
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="Enter new username"
                                            value={credentials.username}
                                            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600 px-1">New Password (Optional)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Settings size={18} className="text-gray-400" />
                                        </div>
                                        <input 
                                            type="password" 
                                            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                            placeholder="Enter new password"
                                            value={credentials.password}
                                            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 mt-4"
                                >
                                    <Save size={20} />
                                    Update Credentials
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>

            {/* Room Add/Edit Modal */}
            {isRoomModalOpen && (
                <div className="fixed inset-0 z-[100] overflow-y-auto p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card bg-white p-4 md:p-8 max-w-2xl w-full relative mx-auto my-auto">
                        <button 
                            onClick={() => setIsRoomModalOpen(false)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-400 hover:text-secondary"
                        >
                            <X size={24} />
                        </button>

                        <h3 className="text-2xl md:text-3xl font-playfair mb-6 md:mb-8">{editingRoom ? 'Edit Room' : 'Add New Room'}</h3>

                        <form onSubmit={handleSaveRoom} className="grid gap-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Room Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full p-3 border rounded-xl outline-none focus:border-primary"
                                        required
                                        value={roomFormData.title}
                                        onChange={e => setRoomFormData({...roomFormData, title: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Sharing Type</label>
                                    <select 
                                        className="w-full p-3 border rounded-xl outline-none focus:border-primary"
                                        value={roomFormData.sharingType}
                                        onChange={e => setRoomFormData({...roomFormData, sharingType: e.target.value})}
                                    >
                                        <option value="Single">Single</option>
                                        <option value="Double">Double</option>
                                        <option value="Triple">Triple</option>
                                        <option value="Quadruple">Quadruple</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Price (Cooler)</label>
                                    <input 
                                        type="number" 
                                        className="w-full p-3 border rounded-xl outline-none focus:border-primary"
                                        value={roomFormData.priceCooler}
                                        onChange={e => setRoomFormData({...roomFormData, priceCooler: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Price (AC)</label>
                                    <input 
                                        type="number" 
                                        className="w-full p-3 border rounded-xl outline-none focus:border-primary"
                                        value={roomFormData.priceAC}
                                        onChange={e => setRoomFormData({...roomFormData, priceAC: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Amenities (Comma separated)</label>
                                <input 
                                    type="text" 
                                    className="w-full p-3 border rounded-xl outline-none focus:border-primary"
                                    placeholder="Free WiFi, Power Backup, Laundry..."
                                    value={roomFormData.amenities}
                                    onChange={e => setRoomFormData({...roomFormData, amenities: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea 
                                    className="w-full p-3 border rounded-xl outline-none focus:border-primary h-32"
                                    value={roomFormData.description}
                                    onChange={e => setRoomFormData({...roomFormData, description: e.target.value})}
                                ></textarea>
                            </div>

                            <div className="grid gap-4">
                                <label className="block text-sm font-semibold">Room Images</label>
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
                                    {roomFormData.images.map((img, idx) => (
                                        <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border">
                                            <img src={img} className="w-full h-full object-cover" />
                                            <button 
                                                type="button"
                                                onClick={() => setRoomFormData({...roomFormData, images: roomFormData.images.filter((_, i) => i !== idx)})}
                                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                    <label className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 aspect-square">
                                        <Upload size={24} className="text-gray-400 mb-2" />
                                        <span className="text-xs text-gray-400">Upload</span>
                                        <input type="file" className="hidden" onChange={e => handleImageUpload(e, url => setRoomFormData({...roomFormData, images: [...roomFormData.images, url]}))} />
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full py-4 mt-4">
                                {editingRoom ? 'Update Room' : 'Add Room'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
