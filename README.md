# Blue Valley Blog – Fullstack Project

This is a fullstack blog platform built with Node.js, Express, Prisma, PostgreSQL, and React (Vite).  
It features a public-facing blog for readers and a secure admin dashboard for the site owner.

---

## Features

- **Public Blog (frontend/consumer):**
  - Browse all published blog posts
  - Read full articles with author and date info
  - Leave comments on posts (no login required)
  - Modern, responsive blue/gray design

- **Admin Dashboard (frontend/author):**
  - Secure login for the site owner (JWT authentication)
  - Dashboard to view, create, edit, delete, and publish/unpublish blog posts
  - Per-post comment management (edit/delete)
  - Modern, responsive admin UI

- **Backend API (backend):**
  - User authentication with JWT and password hashing (bcrypt)
  - CRUD operations for posts and comments
  - Prisma ORM with PostgreSQL
  - Secure routes for admin actions
  - Centralized error handling

---

## Project Structure

```
BLOG-API/
├── backend/         # Node.js/Express/Prisma API server
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── routes/
│   ├── scripts/
│   ├── prisma/
│   ├── app.js
│   └── package.json
├── frontend/
│   ├── consumer/    # Public blog frontend (React/Vite)
│   │   ├── src/
│   │   ├── index.html
│   │   └── package.json
│   └── author/      # Admin dashboard frontend (React/Vite)
│       ├── src/
│       ├── index.html
│       └── package.json
└── README.md        # Project overview (this file)
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL database

### 1. Backend Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Set up your `.env` file in `/backend`:

   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   JWT_SECRET=your_jwt_secret_key
   PORT=3000
   ```

3. Run Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   ```

4. (Optional) Seed your database with an admin user:

   ```bash
   node scripts/createUser.js
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

   The backend will run at [http://localhost:3000](http://localhost:3000).

### 2. Frontend Setup

#### Consumer (Public Blog)

```bash
cd frontend/consumer
npm install
npm run dev
```
Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

#### Author (Admin Dashboard)

```bash
cd frontend/author
npm install
npm run dev
```
Visit [http://localhost:5100](http://localhost:5100) (or the port shown in your terminal).

---

## Usage

- **Public users** can browse and comment on published posts at the consumer site.
- **Admin user** can log in at the author site to manage posts and comments.

---

## Environment

- Both frontends expect the backend API to be running at `http://localhost:3000`.
- Only one admin user is supported for post/comment management.

---

## License

MIT

---
