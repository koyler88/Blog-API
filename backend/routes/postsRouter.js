const { Router } = require("express");
const postsRouter = Router();
const postsController = require('../controllers/postsController')
const authenticateToken = require("../middleware/authMiddleware");

// Get all posts
postsRouter.get('/', postsController.getAllPosts)
// Get single post
postsRouter.get('/:id', postsController.getPostById)
// Create Post
postsRouter.post('/create', authenticateToken, postsController.createPost)



module.exports = postsRouter;
