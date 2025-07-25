const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("kk52188kk", 10);
  await prisma.user.create({
    data: {
      id: 88,
      email: "sendmejunkkso@gmail.com",
      name: "Kimball Oyler",
      password: hashedPassword
    }
  });
}

main()
  .then(() => console.log("User created"))
  .catch(console.error)
  .finally(() => prisma.$disconnect());
