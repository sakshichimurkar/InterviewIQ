import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    credits:{
        type:Number,
        default:100, //new user will have 100 credits by default when he/she sign up
    }

},{timestamps:true}); //timestamps:true will automatically add createdAt and updatedAt fields to the schema
    
const User = mongoose.model("User",userSchema); //User is the name of the model and userSchema is the schema we created above

export default User; //exporting the model so that we can use it in other files