const prisma = require("./prismaClient");

const getAllPosts = async () => {
  const posts = await prisma.post.findMany();

  return posts
};

const getPostById = async (id) => {
    return await prisma.post.findUnique({
        where: { id },
    })
}

const createPost = async (title, content, published, authorId) => {
    return await prisma.post.create({
        data: {
            title,
            content,
            published,
            authorId
        }
    })
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,

}
