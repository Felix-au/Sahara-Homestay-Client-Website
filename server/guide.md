# Server Setup & API Guide

Follow these steps to set up and manage the Sahara Homestay backend.

## 🚀 Setup Steps

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Fill in your `.env` file with MongoDB Atlas credentials and set your admin username/password.

3. **Initialize Data:**
   Run the seeder to populate the initial site content (Hero text, Amenities, etc.) and sample rooms.
   ```bash
   node config/seeder.js
   ```

4. **Start Development:**
   ```bash
   npm start
   ```

## 🛤 API Routes

### Public Routes
- `GET /api/rooms`: List all rooms.
- `GET /api/content`: Get all site content.
- `GET /api/content/:section`: Get content for a specific section.
- `POST /api/messages`: Submit contact form message.
- `POST /api/admin/login`: Authenticate admin.

### Protected Routes (Requires JWT)
- `POST /api/rooms`: Create a new room.
- `PUT /api/rooms/:id`: Update room details.
- `DELETE /api/rooms/:id`: Delete a room.
- `PUT /api/content/:id`: Update site content section.
- `GET /api/messages`: View all guest messages.

## 🔒 Security
The server uses JWT (JSON Web Tokens) to protect administrative routes. The `JWT_SECRET` in your `.env` is used to sign these tokens.

## 📦 Database
The project uses **MongoDB Atlas**. Ensure your IP address is whitelisted in the Atlas dashboard and that you are using the correct connection string in your `.env`.
