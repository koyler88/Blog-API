import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostById } from "../api/posts";
import { fetchCommentsByPost, createComment } from "../api/comments";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);

  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false); // 🔑 Form visibility

  useEffect(() => {
    fetchPostById(id)
      .then(setPost)
      .catch((err) => setError(err.message));
  }, [id]);

  useEffect(() => {
    fetchCommentsByPost(id)
      .then(setComments)
      .catch((err) => setError(err.message));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCommentError(null);

    if (!newComment.trim() || !name.trim()) {
      setCommentError("Name and comment are required.");
      return;
    }

    try {
      const newCom = await createComment(id, {
        content: newComment,
        name,
        email,
      });
      setComments([newCom, ...comments]);
      setNewComment("");
      setName("");
      setEmail("");
      setShowForm(false); // Hide form again after submit
    } catch (err) {
      setCommentError(err.message);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="container post-detail">
      <h1>{post.title}</h1>
      <div className="post-meta">
        {/* Replace with real author/date if available */}
        By <strong>Blue Valley Team</strong> ·{" "}
        <span>
          {new Date(post.createdAt || Date.now()).toLocaleDateString()}
        </span>
      </div>
      <p>{post.content}</p>

      <hr />
      <h3>Comments</h3>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          style={{ marginBottom: "12px" }}
        >
          Leave a Comment
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (required)"
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email (optional)"
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            rows="3"
            style={{ width: "100%", marginBottom: "8px" }}
          />
          <button type="submit">Post Comment</button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
          {commentError && <p style={{ color: "red" }}>{commentError}</p>}
        </form>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {comments.length === 0 && <p>No comments yet.</p>}
        {comments.map((c) => (
          <li key={c.id} style={{ marginBottom: "12px" }}>
            <strong>{c.name || "Anonymous"}</strong>
            <p>{c.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
