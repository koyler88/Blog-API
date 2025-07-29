import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then((allPosts) => {
        const publishedPosts = allPosts.filter(
          (post) => post.published === true
        );
        setPosts(publishedPosts);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className="hero">
        <h1 className="hero-title">Blue Valley Blog</h1>
        <p className="hero-desc">
          Fresh perspectives on technology, sustainability, and innovation.
          Explore our latest articles below.
        </p>
      </section>
      <div className="container home-container">
        {/* <h1>All Posts</h1> */}
        <div className="posts-list">
          {posts.map((post) => (
            <Link to={`/posts/${post.id}`} className="post-card" key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content.slice(0, 100)}...</p>
              <span className="read-more">Read More →</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
