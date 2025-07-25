const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/queries");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.getUserByEmail(email);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
};

module.exports = { login };
