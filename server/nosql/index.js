import express from "express";
import mongoose from 'mongoose';
import Test from './test.js';


const app = express();
app.use(express.json());

const MONGO_URL="mongodb://127.0.0.1:27017/test"  //"mongodb://localhost:27017/test[or we can use this]"

mongoose.connect(MONGO_URL)
 

app.post('/register',async(req,res)=>{
    const{name,age}=req.body;
    console.log(req.body);
    const test=new Test({name,age});
    await test.save();
    res.json({name,age});

});

app.get('/users', async (req, res) => {
    try {
        const users = await Test.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const { name, age } = req.body;
        const updatedUser = await Test.findByIdAndUpdate(
            req.params.id,
            { name, age },
            { new: true, runValidators: true } // Returns updated document & applies schema validation
        );

        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await Test.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(3000,()=>{
    console.log("app is running")
})
