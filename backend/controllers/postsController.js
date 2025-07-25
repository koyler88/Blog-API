const db = require('../db/queries');

const getAllPosts = async (req, res) => {
  try {
    const posts = await db.getAllPosts();
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};

module.exports = {
  getAllPosts,
};
