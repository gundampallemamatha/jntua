import express from "express";
import mysql from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "./schemas/user.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Mamatha@123",
  database: process.env.DB_NAME || "task",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// const app = express();
// app.use(express.json());


// Middleware
// app.use(express.json());  // Parse JSON requests
// app.use(cors());          // Allow CORS

// Dummy users (for testing)
// const users = [
//   { username: "admin", password: "12345", token: "abcdef" }
// ];

// // Login route
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
  
//   if(!username || !password){
//     return res.status(400).json({success:false,message:"missing username or password"});

//   }

//   const user = test.find((u) => u.username === username && u.password === password);
//   if (user) {
//     res.json({ success: true, token: user.token });
//   } else {
//     res.status(401).json({ success: false, message: "Invalid credentials" });
//   }
// });

// Start the server
// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });



// app.listen(3000, () => {
//   console.log('server is running on 3000'); // Corrected this line
// });

db.getConnection((err, connection) => {
    if (err) {
      console.error("Database Connection Failed:", err);
      process.exit(1); // Stop the app if DB fails
    } else {
      console.log("Connected to MySQL Database!");
      connection.release();
    }
});


// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const query = 'INSERT INTO test (username,password) VALUES (?, ?)';
//     db.query(query, [username, password], (err, result) => {
//         if (err) throw err;
//         res.json({ message: 'User added', id: result.insertId });
//     });
// });

app.get('/api/test', (req, res) => {
    const query = 'SELECT * FROM test';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.delete('/api/test/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM test WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'User deleted' });
    });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password required!" });
    }

    const query = "SELECT * FROM test WHERE username = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ success: false, message: "Database error" });
        }
        
        if (results.length > 0) {
            // Generate a token
            const token = jwt.sign({ userId: results[0].id, username }, "your_secret_key", { expiresIn: "1h" });
            return res.json({ success: true, token });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
    });
});

// ✅ **Start Server**
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});