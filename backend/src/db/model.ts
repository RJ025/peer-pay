import mongoose, { Document, Schema } from "mongoose";


export interface User extends Document {
    username : string;
    password : string;
    firstName : string;
    lastName : string;
}

export interface Account extends Document {
    userId : mongoose.Types.ObjectId,
    balance : number
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

const accountSchema : Schema<Account> = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    } ,
    balance : {
        type : Number ,
        required : true
    } 
})

const User = mongoose.model<User>("User" , userSchema)
export const Account = mongoose.model<Account>('Account' , accountSchema)

export default User;
