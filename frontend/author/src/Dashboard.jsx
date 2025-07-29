import { useEffect, useState } from "react";

function PostForm({ onSave, post, onCancel }) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  useEffect(() => {
    setTitle(post?.title || "");
    setContent(post?.content || "");
  }, [post]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSave({ title, content });
      }}
      style={{ marginBottom: 16 }}
    >
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
        style={{ width: "100%", marginBottom: 8 }}
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Content"
        required
        rows={5}
        style={{ width: "100%", marginBottom: 8 }}
      />
      <button type="submit">{post ? "Update" : "Create"} Post</button>
      {onCancel && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default function Dashboard({ token, setToken }) {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postComments, setPostComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/posts", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Failed to fetch posts", err))
      .finally(() => setLoading(false));
  }, [token]);

  const fetchCommentsForPost = async (postId) => {
    const res = await fetch(`http://localhost:3000/posts/${postId}/comments`);
    const data = await res.json();
    setPostComments(data);
  };

  const handleCreateOrUpdatePost = async (data) => {
    if (editingPost) {
      await fetch(`http://localhost:3000/posts/${editingPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    } else {
      await fetch("http://localhost:3000/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    }
    setShowPostForm(false);
    setEditingPost(null);
    const posts = await fetch("http://localhost:3000/posts", {
      headers: { Authorization: `Bearer ${token}` },
    }).then(r => r.json());
    setPosts(posts);
    setPostComments([]);
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setPosts(posts.filter(p => p.id !== id));
    setEditingPost(null);
    setPostComments([]);
  };

  const handleTogglePublish = async (post) => {
    await fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...post, published: !post.published }),
    });
    setPosts(posts.map(p => p.id === post.id ? { ...p, published: !p.published } : p));
  };

  const handleEditPost = async (post) => {
    setEditingPost(post);
    setShowPostForm(true);
    await fetchCommentsForPost(post.id);
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setPostComments(postComments.filter(c => c.id !== commentId));
  };

  const handleEditComment = async (commentId, content) => {
    await fetch(`http://localhost:3000/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    setPostComments(postComments.map(c => c.id === commentId ? { ...c, content } : c));
    setEditingComment(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Dashboard</h2>
        <button onClick={() => setToken(null)}>Logout</button>
      </div>
      <hr />
      <h3>Posts</h3>
      {showPostForm || editingPost ? (
        <PostForm
          post={editingPost}
          onSave={handleCreateOrUpdatePost}
          onCancel={() => {
            setShowPostForm(false);
            setEditingPost(null);
            setPostComments([]);
          }}
        />
      ) : (
        <button onClick={() => {
          setShowPostForm(true);
          setEditingPost(null);
          setPostComments([]);
        }} style={{ marginBottom: 16 }}>+ New Post</button>
      )}
      <table style={{ width: "100%", marginBottom: 32 }}>
        <thead>
          <tr>
            <th align="left">Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id} style={{ background: "#f8fafc" }}>
              <td>{post.title}</td>
              <td>{post.published ? "Published" : "Draft"}</td>
              <td>
                <button onClick={() => handleEditPost(post)}>Edit</button>
                <button onClick={() => handleTogglePublish(post)} style={{ marginLeft: 8 }}>
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <button onClick={() => handleDeletePost(post.id)} style={{ marginLeft: 8, color: "red" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingPost && (
        <>
          <h3>Comments for "{editingPost.title}"</h3>
          {postComments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th align="left">Name</th>
                  <th align="left">Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {postComments.map(comment =>
                  editingComment === comment.id ? (
                    <tr key={comment.id}>
                      <td colSpan={3}>
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            const content = e.target.elements.content.value;
                            handleEditComment(comment.id, content);
                          }}
                        >
                          <input
                            name="content"
                            defaultValue={comment.content}
                            style={{ width: "80%" }}
                          />
                          <button type="submit">Save</button>
                          <button type="button" onClick={() => setEditingComment(null)} style={{ marginLeft: 8 }}>
                            Cancel
                          </button>
                        </form>
                      </td>
                    </tr>
                  ) : (
                    <tr key={comment.id} style={{ background: "#f8fafc" }}>
                      <td>{comment.name}</td>
                      <td>{comment.content}</td>
                      <td>
                        <button onClick={() => setEditingComment(comment.id)}>Edit</button>
                        <button onClick={() => handleDeleteComment(comment.id)} style={{ marginLeft: 8, color: "red" }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}
