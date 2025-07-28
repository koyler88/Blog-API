const prisma = require("./prismaClient");

const getAllPosts = async () => {
  const posts = await prisma.post.findMany();

  return posts;
};

const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
  });
};

const createPost = async (title, content, published, authorId) => {
  return await prisma.post.create({
    data: {
      title,
      content,
      published,
      authorId,
    },
  });
};

const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

const deletePost = async (id) => {
  return await prisma.post.delete({
    where: { id },
  });
};

const updatePost = async (id, title, content, published) => {
  return await prisma.post.update({
    where: { id },
    data: { title, content, published },
  });
};

const getCommentsByPost = async (id) => {
  return await prisma.comment.findMany({
    where: {
      postId: id,
    },
  });
};

const createComment = async (postId, content, name, email) => {
  return await prisma.comment.create({
    data: {
      postId: postId,
      name: name,
      content: content,
      email: email
    }
  })
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  getUserByEmail,
  deletePost,
  updatePost,
  getCommentsByPost,
  createComment
};
