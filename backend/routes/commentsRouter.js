const { Router } = require("express");
const commentsRouter = Router();
const commentsController = require("../controllers/commentsController");
const authenticateToken = require("../middleware/authMiddleware");

// Delete comment by ID
commentsRouter.delete("/:commentId", authenticateToken, commentsController.deleteComment);
// Update comment by ID
commentsRouter.put("/:commentId", authenticateToken, commentsController.updateComment);

module.exports = commentsRouter;
