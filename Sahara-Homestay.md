# Sahara Homestay: Technical Documentation

> **Sahara Homestay** is a premium MERN stack application designed to bridge the gap between homestay owners and residents. It features a fully dynamic frontend, a secure JWT-authenticated admin dashboard, and a seamless booking flow.

---

## Table of Contents
1. [System Architecture](#system-architecture)
2. [Data Models](#data-models)
3. [API Documentation](#api-documentation)
4. [Admin Features & Logic](#admin-features--logic)
5. [Frontend Design System](#frontend-design-system)
6. [Image Handling Pipeline](#image-handling-pipeline)

---

## System Architecture

### Frontend (React + Vite)
- **Component-Based**: Modular components like `Hero`, `RoomCard`, and `Navbar`.
- **State Management**: React Hooks (`useState`, `useEffect`) for local state and data fetching.
- **Animations**: `Framer Motion` for smooth transitions and rolling testimonials.
- **Styling**: `Tailwind CSS` for a modern, glassmorphic UI.

### Backend (Node.js + Express)
- **RESTful API**: Clean separation of concerns with dedicated routes for Rooms, Content, and Messages.
- **Security**: `JSON Web Tokens (JWT)` for admin session management.
- **Database**: `MongoDB Atlas` with Mongoose ODM.

---

## Data Models

### Room Model
```javascript
{
  title: String,
  location: String, // e.g., "Haryana"
  description: String,
  priceCooler: Number,
  priceAC: Number,
  images: [String], // URLs from ImgBB
  amenities: [String]
}
```

### Content Model (CMS)
Generic schema used to store section-specific data (Hero, Gallery, Contact, etc.).
```javascript
{
  section: String, // e.g., "hero", "contact"
  data: Object    // Flexible JSON structure
}
```

### Message Model
```javascript
{
  guestName: String,
  email: String,
  phone: String,
  message: String,
  createdAt: Date
}
```

---

## API Documentation

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| GET | `/api/rooms` | Fetch all rooms | Public |
| GET | `/api/content` | Fetch all CMS content | Public |
| POST | `/api/messages` | Submit a contact form | Public |
| POST | `/api/admin/login`| Admin authentication | Public |
| PUT | `/api/rooms/:id` | Update a room | Private |
| PUT | `/api/content/:id`| Update CMS section | Private |

---

## Admin Features & Logic

### Dynamic Column Configuration
The admin can specify how many columns should be displayed in the **Rooms** and **Gallery** sections on the home page. This is stored in the `rooms_config` and `gallery` content objects and applied via inline CSS `gridTemplateColumns`.

### Testimonial Management
Admin can add/edit guest reviews. If an image is provided, it is displayed in a circular frame. If not, the system automatically renders a badge with the first letter of the guest's name using a primary-themed background.

---

## Frontend Design System

- **Primary Color**: `#730004` (Sahara Red)
- **Accent Color**: Glassmorphic white (`bg-white/80 backdrop-blur-md`)
- **Typography**: Playfair Display (Headings), Inter (Body)
- **Shadows**: Subtle 2XL shadows for cards and modals.

---

## Image Handling Pipeline

1. **Upload**: Admin selects a file in the `AdminDashboard`.
2. **Hosting**: The image is sent to the **ImgBB API**.
3. **Storage**: ImgBB returns a direct URL.
4. **Persistence**: The URL is saved to MongoDB via the Sahara API.
5. **Display**: The frontend renders the image using the direct URL.

---

## Project Structure

```
sahara/
├── client/
│   ├── src/
│   │   ├── components/  # Hero.jsx, Navbar.jsx, RoomCard.jsx
│   │   └── pages/       # Home.jsx, AdminDashboard.jsx, AdminLogin.jsx
├── server/
│   ├── models/          # Room.js, Content.js, Message.js
│   ├── routes/          # rooms.js, content.js, messages.js, admin.js
│   └── config/          # db.js, seeder.js
```

---

*Sahara Homestay v1.0 — A Premium MERN Solution*
