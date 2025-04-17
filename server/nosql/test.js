import mongoose from "mongoose";

const testSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true,
        
    },
    age:{
        type:Number,
        require:true,
        min:18,max:60
    }
})

const Test=mongoose.model("Test", testSchema);
export default Test;