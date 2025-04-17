import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Create MySQL Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Mamatha@123",
  database: process.env.DB_NAME || "Login",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ✅ Check database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database Connection Failed:", err);
    process.exit(1); // Stop the app if DB fails
  } else {
    console.log("Connected to MySQL Database!");
    connection.release();
  }
});

// ✅ Set JWT Secret Key with Fallback
const SECRET_KEY = process.env.JWT_SECRET || "defaultsecretkey";

// ✅ Login API
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required!" });
  }

  console.log("Login attempt:", username); // Log the username for debugging

  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length > 0) {
      const isMatch = await bcrypt.compare(password, rows[0].password);
      if (isMatch) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
        return res.json({ success: true, token });
      }
    }
    res.status(401).json({ success: false, message: "Invalid credentials!" });
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});

// ✅ User Registration API
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.promise().query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
    res.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Corrected this line
});
