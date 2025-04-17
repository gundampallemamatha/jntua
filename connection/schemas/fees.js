import mongoose from "mongoose";
// import Student from "./schemas/student.js";

const FeeSchema=new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
    
},{timestamps:true})

const Fee=mongoose.model('Fee', FeeSchema);

export default Fee;