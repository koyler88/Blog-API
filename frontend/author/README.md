# Blue Valley Blog – Author/Admin Site

This is the admin dashboard for the Blue Valley Blog, built with React and Vite.  
It allows the site owner to log in, manage blog posts, and moderate comments.

## Features

- Secure login for the site owner (JWT authentication)
- Dashboard to view, create, edit, delete, and publish/unpublish blog posts
- Per-post comment management (edit/delete)
- Modern, responsive blue/gray admin UI
- Built with React, React Router, and Vite

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- The backend API running at `http://localhost:3000`
- An admin user created in the backend database

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser at [http://localhost:5100](http://localhost:5100) (or the port shown in your terminal).

### Build for Production

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
  Login.jsx        # Login page for admin
  Dashboard.jsx    # Main dashboard for posts/comments
  App.jsx          # Routing and auth logic
  index.css        # Admin dashboard styles
  main.jsx         # Entry point
```

## Environment

- Expects the backend API to be running at `http://localhost:3000`
- Only the site owner can log in and manage content

## License

MIT
