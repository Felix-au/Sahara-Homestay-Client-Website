<p align="center">
</p>
<h1 align="center">Sahara Homestay: Premium Living Reimagined</h1>
<p align="center">
  <strong>A modern, dynamic MERN stack platform for premium homestay management</strong><br/>
  <em>Responsive UI → Dynamic CMS → Admin Dashboard → Instant Booking via WhatsApp</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-blue?style=flat-square" alt="Stack" />
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=white" alt="Frontend" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Backend" />
  <img src="https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="Database" />
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Admin Panel](#-admin-panel)
- [Project Structure](#-project-structure)
- [Contact](#-contact)

---

## 🔍 Overview

**Sahara Homestay** is a high-end, full-stack web application designed for student and professional accommodation management. Unlike static websites, Sahara features a robust **Dynamic CMS** that allows administrators to update room details, gallery images, testimonials, and contact information in real-time without touching a single line of code.

The platform prioritizes visual excellence with a modern "Glassmorphism" aesthetic, smooth animations, and a user-centric booking flow integrated with WhatsApp.

---

## ✨ Key Features

### 🖥️ Dynamic Frontend
| Feature | Description |
|---|---|
| **Responsive Design** | Optimized for mobile, tablet, and desktop viewing. |
| **Hero Section** | Dual-column layout with top-aligned text and vertical rolling testimonials. |
| **Dynamic Rooms** | Admin-configurable grid layouts for room listings. |
| **Testimonial Engine** | Rolling reviews with profile images and fallback initial badges. |
| **WhatsApp Booking** | Instant lead generation via pre-filled WhatsApp messages. |

### 🛠️ Powerful Admin Dashboard
| Feature | Description |
|---|---|
| **Live CMS** | Update Hero text, Subtitles, and Contact info on the fly. |
| **Gallery Manager** | Drag-and-drop image uploads with automatic ImgBB integration. |
| **Room Management** | Add/Edit rooms with dual pricing (Cooler vs. AC) and location support. |
| **Message Center** | Dedicated inbox for contact form submissions. |
| **Global Config** | Change site-wide settings like room column counts from the UI. |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Sahara Homestay Platform                     │
│                                                                 │
│  ┌───────────────┐    ┌──────────────────────────────────────┐  │
│  │   Frontend    │    │          Backend (Node/Express)      │  │
│  │   (React)     │    │                                      │  │
│  │               │    │  ┌────────────┐  ┌────────────────┐  │  │
│  │ Vite + React  │◄──►│  │ API Routes │  │ Authentication │  │  │
│  │ Tailwind CSS  │    │  │ (REST)     │  │ (JWT)          │  │  │
│  │ Framer Motion │    │  └─────┬──────┘  └────────────────┘  │  │
│  └───────────────┘    │        │         ┌───────────────┐   │  │
│                       │  ┌─────▼──────┐  │ Image Hosting │   │  │
│                       │  │   MongoDB  │  │ (ImgBB API)   │   │  │
│                       │  │   Atlas    │  └───────────────┘   │  │
│                       │  └────────────┘                      │  │
│                       └──────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/Felix-au/Sahara-Homestay-Client-Website.git
cd Sahara-Homestay-Client-Website

# Install Server Dependencies
cd server && npm install

# Install Client Dependencies
cd ../client && npm install
```

### 2. Environment Setup
Create a `.env` file in the `/server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
ADMIN_USER=admin
ADMIN_PASS=admin123
```

### 3. Run Development
```bash
# In /server
npm start

# In /client
npm run dev
```

---

## 📦 Project Structure

```
sahara/
├── client/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components (Home, Admin)
│   │   └── index.css    # Global styles & animations
│   └── public/          # Static assets
├── server/              # Node.js Backend
│   ├── models/          # Mongoose Schemas
│   ├── routes/          # API Endpoints
│   ├── config/          # DB connection & Seeder
│   └── server.js        # Entry point
├── README.md            # You are here
├── guide.md             # Detailed setup guide
└── Sahara-Homestay.md   # Deep dive documentation
```

---

## 👤 Author

**Felix-au**

- 🔗 GitHub: [github.com/Felix-au](https://github.com/Felix-au)
- 📧 Email: [felixaugum@gmail.com](mailto:felixaugum@gmail.com)

---

<p align="center">
  <sub>Built for comfort. Designed for Sahara.</sub>
</p>
