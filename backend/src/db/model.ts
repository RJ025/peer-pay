import mongoose, { Document, Schema } from "mongoose";


export interface User extends Document {
    username : string;
    password : string;
    firstName : string;
    lastName : string;
}

const userSchema : Schema<User> = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
    } ,
    password : {
        type : String ,
        required : true
    } ,
    firstName : {
        type : String ,
        required : true ,
        trim : true
    } ,
    lastName : {
        type : String,
        required : true,
        trim : true
    }
})

const User = mongoose.model<User>("User" , userSchema)

export default User;