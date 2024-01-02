const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// POST /api/users/register //
router.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
    delete user.password;
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login //
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const secretKey = process.env.SECRET_KEY;

  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.status(401).json({ message: "Invalid credentials" });
      } else {
        const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
      }
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users //
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id //
router.get("/:id", async (req, res, next) => {
  // grab the id from the url
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: +id },
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
