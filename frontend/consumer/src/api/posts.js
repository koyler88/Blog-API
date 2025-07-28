const API_BASE = "http://localhost:3000";

export const fetchPosts = async () => {
  const res = await fetch(`${API_BASE}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const fetchPostById = async (id) => {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
};

export const createPost = async (postData, token) => {
  const res = await fetch(`${API_BASE}/posts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create post");
  }

  return res.json();
};

export const deletePost = async (postId, token) => {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete post");
  return res.json();
};

export const updatePost = async (postData, postId, token) => {
  const res = await fetch(`${API_BASE}/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update post");
  }

  return res.json();
};

// Add createPost, deletePost, updatePost with auth headers later
