<p align="center">
  <img src="../client/public/logo.png" width="120" alt="Sahara Homestay Logo"/>
</p>

# Sahara Homestay — Server (Backend)

This is the Node.js/Express backend for the Sahara Homestay platform, using MongoDB for data persistence and JWT for authentication.

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file with the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   ADMIN_USER=admin
   ADMIN_PASS=admin123
   ```

3. **Seed Database:**
   ```bash
   node config/seeder.js
   ```

4. **Start Server:**
   ```bash
   npm start
   ```

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB
- **ORM:** Mongoose
- **Auth:** JSON Web Tokens (JWT)
- **Security:** bcryptjs (for password hashing - optional if using plain pass in env)

## 📁 Key Directories
- `/models`: Mongoose schemas (Room, Content, Message).
- `/routes`: Express route handlers.
- `/config`: Database connection and seeder script.
- `/utils`: Helper functions (e.g., image upload handlers).
