const db = require("../db/queries");

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const getPostById = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const post = await db.getPostById(id);
    if (!post) return res.status(400).json({ error: "Post not found" });
    return res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const authorId = 88;
  let { published } = req.body;

  // Convert string to boolean
  published = published === "true";

  try {
    const newPost = await db.createPost(title, content, published, authorId);
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const deletePost = await db.deletePost(id);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};

const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;
  let { published } = req.body;

  // Convert string to boolean
  published = published === "true";

  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const updatedPost = await db.updatePost(id, title, content, published);
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Failed to update post" });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
  
};
