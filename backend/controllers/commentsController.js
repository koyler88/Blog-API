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

module.exports = {
  getCommentsByPost,
  createComment,
  
};
