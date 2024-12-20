import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email:String,
    image:String,
    name:String,
});
export const users = mongoose.models.users || mongoose.model("users",userModel);