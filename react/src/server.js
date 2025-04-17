const express = require('express');
const bodyParser = require("bodyparser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/loginForm', (req, res) => {
    const { email, password } = req.body;
    if (email === 'user@example.com' && password === 'password') {
        return res.status(200).json({ message: 'Login successful' });
    }

    res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});