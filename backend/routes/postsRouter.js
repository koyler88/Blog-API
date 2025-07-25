const { Router } = require("express");
const postsRouter = Router();
const postsController = require('../controllers/postsController')

// Get all posts
postsRouter.get('/', postsController.getAllPosts)



module.exports = postsRouter;
