const prisma = require("./prismaClient");

const getAllPosts = async () => {
  const posts = await prisma.post.findMany();

  return posts
};

module.exports = {
    getAllPosts,
    
}
