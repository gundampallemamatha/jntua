// import mysql from 'mysql2';
// import express from 'express';
// const app=express()
// app.use(express.json())
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Mamatha@123',
//     database: 'test'
// })
// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to mySQL:', err);
//         return;
//     }
//     console.log('Connected to  MYSQL database');
// });
// app.get('/api/users', (req, res) => {
//     const query = 'SELECT * FROM users';
//     connection.query(query, (err, results) => {
//         if (err) throw err;
//         res.json(results);
//     });
// });
// app.put('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     const { name, email } = req.body;
//     const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
//     connection.query(query, [name, email, id], (err, result) => {
//         if (err) throw err;
//         res.json({ message: 'User updated' });
//     });
// });
// app.delete('/api/users/:id', (req, res) => {
//     const { id } = req.params;
//     const query = 'DELETE FROM users WHERE id = ?';
//     connection.query(query, [id], (err, result) => {
//         if (err) throw error;
//         res.json({ message: 'User deleted' });
//     });
// });
// app.post('/api/users', (req, res) => {
//     const { name, email } = req.body;
//     const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
//     connection.query(query, [name, email], (err, result) => {
//         if (err) throw error;
//         res.json({ message: 'User added', id: result.insertId });
//     });
// });

// connection.query('select * from users', (err, result) => {
//     if (err) throw error;
//     console.log('Data fetched:',result);

// });
// app.listen(3000,() => {
//     console.log("server is running on port 3000");
// // });
///////////////////////////////////////////////////////////////////////////////////
// const  sql =  'INSERT INTO users(name,email) VALUES(?,?)';
// const values = ['mamatha','mamathaglory123@gmail.com'];
// connection.query(sql, values, (err, results) => {

//     if (err) throw err;
//     console.log("Data Inserted",results);
// });

// connection.query('select * from users', (err, result) => {
//     if (err) throw err;
//     console.log('Data fetched:',result);

// });

// import express from 'express';

// const app = express();
// app.use(express.json());

// // app.use((req, res, next) => {
// //     console.log($ {
// //             req.method
// //         }
// //         $(req.url));
// //     next();

// // });
// app.get('/home', (req, res) => {
//     res.send("welcome to home page");

// });
// app.get('/about', (req, res) => {
//     res.send("welcome to the about page");
// });
// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     res.json({ message: 'user registration is successfull', user: { name, email, password } });

// });

// app.listen(3000, () => {
//     console.log('server is running on port 3000');
// });

import express from "express";
import mongoose from 'mongoose';
import Test from './test.js';


const app = express();

const MONGO_URL="mongodb://localhost:27017/users"

mongoose.connect(MONGO_URL)
 

app.post('/register',async(req,res)=>{
    const{name,age}=req.body;
    const test=new Test({name,age});
    await test.save();
    res.json({name,age});

})
app.listen(3000,()=>{
    console.log("app is running")
})

