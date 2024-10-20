import express, { Request, RequestHandler, Response }  from "express";
import { z } from 'zod'
import brcypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../db/model";
import authMiddleware from "../middleware";

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


userRouter.post('/signin' , async (req : Request , res:Response) : Promise<void>  => {
    const {success , data} = signInBody.safeParse(req.body)

    if(!success) {
        res.status(411).json({
            message : 'invalid Inputs'
        })

        return;
    }

    const {username , password} = data;

    const user = await User.findOne({
        username
    })

    if(!user) {
        res.status(400).json({
            message : 'username does not exist'
        })

        return;
    }

    const hashedPassword : string  = user?.password || '';

    const isPasswordCorrect = await brcypt.compare(password , hashedPassword)

    if(!isPasswordCorrect) {
        res.status(400).json({
            message : 'incorrect password'
        })

        return;
    }

    const token = jwt.sign({
        userId : user._id
    } , process.env.SECRET || '')

    res.status(200).json({
        token ,
        message : `welcoms ${username}`
    })

})

const updateBody = z.object({
    password : z.string() ,
    firstName : z.string(),
    lastName : z.string()
})

userRouter.put('/' , authMiddleware , async (req : Request , res : Response) : Promise<void> => {
    const {success , data} = updateBody.safeParse(req.body);
    if(!success){
        res.status(400).json({
            message : 'invalid inputs'
        })

        return;
    }

    try {
        if(!req.userId){
            res.status(403).json({
                message : 'unauthorized'
            })
            return;
        }
        const result = await User.updateOne({_id : req.userId} , data)

        if(result.matchedCount === 0){
            res.status(404).json({
                message : 'user not found or nothing to update'
            })
            return;
        }

        res.status(200).json({
            message : 'user updtaed successfully'
        })

    } catch (error) {
        res.status(500).json({
            message :'error while updating'
        })

    }

})

userRouter.get('/bulk' , async(req : Request , res : Response) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})



export default userRouter