# Sahara Homestay: Project Setup & Guide

A comprehensive guide to setting up and managing the Sahara Homestay platform.

> [!IMPORTANT]
> This project is a full-stack MERN application. You must run both the **Client (Vite/React)** and the **Server (Node/Express)** simultaneously for the platform to function correctly.

## 🚀 How to Run

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB Atlas** account (or local MongoDB instance)
- **ImgBB API Key** (for image uploads)

### 2. Backend Setup (Server)
```bash
cd server
npm install
```

Create a `.env` file in the `server` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret_string
ADMIN_USER=admin
ADMIN_PASS=admin123
```

**Seed the Database (First time only):**
```bash
node config/seeder.js
```

**Start the Server:**
```bash
npm start
```

### 3. Frontend Setup (Client)
```bash
cd client
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (or similar, check Vite output).

## 🛠 Admin Dashboard

Access the admin panel at `/admin`.

**Login Credentials:**
- **Username:** `admin` (as set in .env)
- **Password:** `admin123` (as set in .env)

### Managing Content:
- **Hero Section:** Update headings and images instantly.
- **Rooms:** Add new rooms, specify pricing for Cooler vs. AC, and set locations.
- **Gallery:** Upload multiple images. These are hosted on ImgBB and saved to your DB.
- **Testimonials:** Manage guest reviews. If a profile image is missing, a stylish initial badge is auto-generated.
- **Messages:** View all inquiries sent via the Contact form.

## 📦 Deployment

### Building for Production
```bash
# Build Frontend
cd client
npm run build

# The build artifacts will be in /client/dist
```

To serve the frontend from the Express server, configure the `server.js` to serve static files from the `client/dist` directory in production mode.

## ⚠️ Important Notes
- **Image Uploads:** The platform uses ImgBB for free image hosting. Ensure your API key in `AdminDashboard.jsx` (or a server-side helper) is valid.
- **WhatsApp Integration:** The booking flow generates a URL with a pre-filled message. Ensure the phone number in the Contact section is formatted correctly (e.g., `917300048228`).
- **Responsive Design:** The site uses Tailwind CSS for a mobile-first responsive layout. Testing on various screen sizes is recommended.
