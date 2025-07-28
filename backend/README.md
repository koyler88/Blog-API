# Blog API Backend

This is the backend API for a blog platform built with Node.js, Express, Prisma ORM, and PostgreSQL. It provides endpoints for user authentication, managing posts, and handling comments. Authentication is handled with JSON Web Tokens (JWT).

---

## Features

- User authentication with JWT and password hashing (bcrypt)
- Create, read, update, delete (CRUD) operations for posts
- CRUD operations for comments
- Role-based access control (currently only one admin user)
- Input validation and error handling
- Database schema managed with Prisma ORM
- Secure routes protected with JWT middleware

---

## Tech Stack

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt for password hashing
- dotenv for environment variable management
- CORS for cross-origin resource sharing

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/backend

2. Install Dependencies: 

    npm install

3. Set up your .env file with the following environment variables:

    DATABASE_URL=postgresql://user:password@host:port/database
    JWT_SECRET=your_jwt_secret_key
    PORT=3000

4. Run Prisma migrations to set up your database schema:

    npx prisma migrate dev --name init

5. Seed your database with an initial user (optional, create your user script):

    node scripts/createUser.js

6. Start the server

    npm run dev

The server will run on http://localhost:3000

## API Endpoints
## Auth

POST /auth/login - Authenticate user and receive a JWT token.

## Posts
GET /posts - Get all posts.

GET /posts/:id - Get a single post by ID.

POST /posts/create - Create a new post (protected).

PUT /posts/:id - Update a post (protected).

DELETE /posts/:id - Delete a post (protected).

GET /posts/:id/comments - Get comments for a post.

POST /posts/:id/comments - Add a comment to a post.

## Comments
PUT /comments/:commentId - Update a comment (protected).

DELETE /comments/:commentId - Delete a comment (protected).

## Middleware
JWT authentication middleware protects routes that require a logged-in user.

Centralized error handling middleware for API responses.

## Project Structure

backend/
├── controllers/
├── db/
│   ├── prismaClient.js
│   └── queries.js
├── middleware/
├── routes/
├── scripts/
├── prisma/
│   └── schema.prisma
├── app.js
├── package.json
└── .env
## Notes
Currently, only one user (admin) is supported for post creation and protected routes.

Passwords are securely hashed with bcrypt.

Ensure you keep your JWT_SECRET and database credentials secure.

## License

MIT



