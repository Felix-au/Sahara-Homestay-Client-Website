# Client Setup & Development Guide

Follow these steps to set up the Sahara Homestay frontend development environment.

## 🛠 Prerequisites
- Node.js (v18+)
- npm or yarn

## 🚀 Setup Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Dev Server:**
   ```bash
   npm run dev
   ```

3. **Environment (Local):**
   The client expects the backend to be running on `http://localhost:5000`. Ensure your backend is started before using features like room listings or the admin panel.

## 🎨 UI Components

### Hero Section (`Hero.jsx`)
Features a dual-column layout. The left side displays the hero image, and the right side features a vertical scrolling carousel of guest testimonials.

### Room Grid (`RoomCard.jsx`)
Displays room details, dual pricing (Cooler/AC), and a booking button. The grid layout (columns) is dynamically controlled from the Admin Panel.

### Admin Dashboard (`AdminDashboard.jsx`)
A comprehensive management interface. 
- **Responsive Navigation:** `AdminNavbar` includes a mobile hamburger menu for easy navigation on small screens.
- **Tabs:** Site Content, Manage Rooms, Bookings, Messages, and Settings.
- **Booking Actions:** Confirm or cancel bookings directly from the UI.
- **Image Uploads:** Integrates with ImgBB API for seamless image hosting.
- **Security:** Settings tab for updating admin credentials.

## 📦 Deployment
Run `npm run build` to generate the production bundle in the `dist` folder.
