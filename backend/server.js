const path = require("path");
const jsonserver = require("json-server");
const bcrypt = require("bcryptjs");


const SALT_ROUNDS = 10;
const PORT = process.env.PORT || 3001;  


const server = jsonserver.create();
const router = jsonserver.router(path.join(__dirname, "db.json"));
const middlewares = jsonserver.defaults();


server.use(middlewares);

const hashPasswordIfPresent = async (req, res, next) => {
  if (!req.body?.password) return next();

  try {
    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    next();
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ error: "Failed to hash password" });
  }
};

server.use('/users', (req, res, next) => {
  const method = req.method.toUpperCase();
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    return hashPasswordIfPresent(req, res, next);
  }
  next();
});


server.post("/auth/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const user = router.db.get("users").find({ email }).value();

    if (!user?.password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const { password: _, ...safeUser } = user;

    return res.json(safeUser);
  } catch (error) {
    console.error("Login failed", error);
    return res.status(500).json({ error: "Login failed" });
  }
});


server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
