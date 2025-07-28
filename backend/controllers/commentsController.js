const db = require("../db/queries");

const getCommentsByPost = async (req, res) => {
  const postId = parseInt(req.params.id);

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const comments = await db.getCommentsByPost(postId);
    return res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const createComment = async (req, res) => {
  const postId = parseInt(req.params.id);
  const { content, name, email } = req.body;

  if (isNaN(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const comment = await db.createComment(postId, content, name, email);
    return res.json(comment);
  } catch (error) {
    console.log("Error creating comment:", error);
    return res.status(500).json({ error: "Failed to create comment" });
  }
};

const updateComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);
  const { content, name, email } = req.body;

  if (isNaN(commentId)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  try {
    const updatedComment = await db.updateComment(
      commentId,
      content,
      name,
      email
    );
    return res.json(updatedComment);
  } catch (error) {
    console.log("Error updating comment:", error);
    return res.status(500).json({ error: "Failed to update comment" });
  }
};

const deleteComment = async (req, res) => {
  const commentId = parseInt(req.params.commentId);

  if (isNaN(commentId)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  try {
    const deletedComment = await db.deleteComment(commentId);
    return res.json({ message: "Comment Deleted" });
  } catch (error) {
    console.log("Error deleting comment", error);
    return res.status(500).json({ error: "Failed to delete comment" });
  }
};

module.exports = {
  getCommentsByPost,
  createComment,
  updateComment,
  deleteComment,
};
