import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

// Placeholder for Admin components
const AdminLogin = () => <div className="h-screen flex items-center justify-center"><h2>Admin Login Coming Soon...</h2></div>;
const AdminDashboard = () => <div className="h-screen flex items-center justify-center"><h2>Admin Dashboard Coming Soon...</h2></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
