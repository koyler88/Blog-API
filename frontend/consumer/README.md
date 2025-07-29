# Blue Valley Blog – Consumer Site

This is the public-facing frontend for the Blue Valley Blog, built with React and Vite.  
Visitors can browse published blog posts, read articles, and leave comments.

## Features

- Modern, responsive design with a blue/gray color scheme
- Browse all published blog posts
- Read full articles with author and date info
- Leave comments on posts (no login required)
- Built with React, React Router, and Vite

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- The backend API running at `http://localhost:3000`

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

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
  api/         # API helper functions
  pages/       # React page components (Home, PostDetail)
  styles/      # CSS styles
  App.jsx      # Main app component with routing
  main.jsx     # Entry point
```

## Environment

- Expects the backend API to be running at `http://localhost:3000`
- No authentication required for consumers

## License

MIT
