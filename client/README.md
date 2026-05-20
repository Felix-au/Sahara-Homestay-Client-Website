<p align="center">
  <img src="public/logo.png" width="120" alt="Sahara Homestay Logo"/>
</p>

# Sahara Homestay — Client (Frontend)

This is the React-based frontend for the Sahara Homestay platform, built with Vite and Tailwind CSS. It features a modern, mobile-responsive layout for both public users and administrators.

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 🛠 Tech Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios

## 📁 Key Directories
- `/src/components`: UI building blocks (Navbar, Hero, RoomCard, Footer, AdminNavbar).
- `/src/pages`: Main page views (Home, AdminDashboard, AdminLogin).
- `/src/assets`: Static images and brand assets.
- `/src/index.css`: Global styles, custom glassmorphism effects, client-strip scrolling keyframe animations, and sticky footer positioning rules.

## ⚙️ Configuration

The frontend connects to the backend API using the `VITE_API_BASE_URL` environment variable.

1. Create a `.env` file in the `client` directory (you can copy from `.env.example`):
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
2. The frontend loads this variable via Vite's `import.meta.env` mechanism in `src/config.js`.

