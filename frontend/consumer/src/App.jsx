import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";

function Header() {
  const location = useLocation();
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="site-title">Blue Valley Blog</Link>
        <nav className="site-nav">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </>
  );
}

export default App;
