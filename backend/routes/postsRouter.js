const { Router } = require("express");
const postsRouter = Router();
const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
const authenticateToken = require("../middleware/authMiddleware");

// Get all posts
postsRouter.get("/", postsController.getAllPosts);
// Get single post
postsRouter.get("/:id", postsController.getPostById);
// Create Post
postsRouter.post("/create", authenticateToken, postsController.createPost);
// Delete Post
postsRouter.delete("/:id", authenticateToken, postsController.deletePost);
// Update Post
postsRouter.put("/:id", authenticateToken, postsController.updatePost);

// Get comments for single post
postsRouter.get("/:id/comments", commentsController.getCommentsByPost);
// Create comment on post
postsRouter.post('/:id/comments', commentsController.createComment);

module.exports = postsRouter;
