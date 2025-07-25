const { Router } = require("express");
const postsRouter = Router();
const postsController = require('../controllers/postsController')

// Get all posts
postsRouter.get('/', postsController.getAllPosts)
// Get single post
postsRouter.get('/:id', postsController.getPostById)



module.exports = postsRouter;
