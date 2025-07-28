import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostById } from "../api/posts";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPostById(id)
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="container post-detail">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
