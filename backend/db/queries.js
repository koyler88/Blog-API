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

module.exports = {
    getAllPosts,
    getPostById,

}
