// server.js
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app = express();
const PORT = 5000;
const SECRET_KEY = 'mysecretkey';

app.use(cors());
app.use(bodyParser.json());

const user = {
  username: 'admin',
  password: '123456'
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ message: 'Login successful', token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
