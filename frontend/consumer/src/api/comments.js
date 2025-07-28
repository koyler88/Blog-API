const API_BASE = "http://localhost:3000";

export const fetchCommentsByPost = async (postId) => {
  const res = await fetch(`${API_BASE}/posts/${postId}/comments`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

export const createComment = async (postId, commentData) => {
  const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to create comment");
  }
  return res.json();
};

export const updateComment = async (commentId, commentData, token) => {
  const res = await fetch(`${API_BASE}/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update comment");
  }

  return res.json();
};

export const deleteComment = async (commentId, token) => {
  const res = await fetch(`${API_BASE}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to delete comment");
  }

  return res.json();
};
