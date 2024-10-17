import express, { Request, Response }  from "express";
import { z } from 'zod'
import brcypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../db/model";

const userRouter = express.Router()

const signUpBody = z.object({
    username : z.string().email() ,
    password : z.string() ,
    firstName : z.string() ,
    lastName : z.string()
})


//@ts-ignore
userRouter.post('/signup' , async (req : Request , res : Response) => {
    const {success , data} = signUpBody.safeParse(req.body)
    if(!success) {
        return res.status(411).json({
            message : 'invalid inputs'
        })
    }

    const {username , password , firstName , lastName} = data

    const existingUser = await User.findOne({
        username
    })

    if(existingUser){
        return res.status(411).json({
            message : "Email already exists"
        })
    }

    const hashedPassword = await brcypt.hash(password , 10)

    const user = await User.create({
        username,
        password : hashedPassword,
        firstName,
        lastName
    })

    const userId = user._id;

    const token = jwt.sign({
        userId
    } , process.env.SECRET || '')

    res.json({
        token,
        message : `welcome ${username}`
    })
})

const signInBody = z.object({
    username : z.string().email(),
    password : z.string()
})

//@ts-ignore
userRouter.post('/signin' , async (req : Request , res:Response) => {
    const {success , data} = signInBody.safeParse(req.body)

    if(!success) {
        return res.status(411).json({
            message : 'invalid Inputs'
        })
    }

    const {username , password} = data;

    const user = await User.findOne({
        username
    })

    if(!user) {
        return res.status(400).json({
            message : 'username does not exist'
        })
    }

    const hashedPassword : string  = user?.password || '';

    const isPasswordCorrect = await brcypt.compare(password , hashedPassword)

    if(!isPasswordCorrect) {
        return res.status(400).json({
            message : 'incorrect password'
        })
    }

    const token = jwt.sign({
        userId : user._id
    } , process.env.SECRET || '')

    res.status(200).json({
        token ,
        message : `welcoms ${username}`
    })

})


export default userRouter