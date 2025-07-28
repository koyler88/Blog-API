import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container home-container">
      <h1>All Posts</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content.slice(0, 100)}...</p>
            <Link to={`/posts/${post.id}`} className="read-more">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
