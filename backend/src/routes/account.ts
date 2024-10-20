import express, { Request, Response } from 'express'
import { z } from 'zod'
import authMiddleware from '../middleware';
import { Account } from '../db/model';
import mongoose from 'mongoose';
const accountRouter = express.Router();



accountRouter.get('/balance' , authMiddleware , async (req : Request , res : Response) : Promise<void> => {

    try {
        const account = await Account.findOne({userId : req.userId});
        res.status(200).json({
            balance : account?.balance
        })
    } catch (err) {
        res.status(401).json({
            message : 'error fetching balance'
        })
    }
})


const transferInput = z.object({
    to : z.string() , 
    amount : z.number()
})



accountRouter.post('/transfer' , authMiddleware , async (req : Request , res : Response) : Promise<void> => {
    const { success , data } = transferInput.safeParse(req.body);

    if(!success) {
        res.status(400).json({
            message : 'invalid inputs'
        })

        return;
    }

    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount , to } = data;
    const account = await Account.findOne({userId : req.userId}).session(session);
    if(!account || account.balance < amount) {
        await session.abortTransaction();
        res.status(400).json({
            message : 'not enough balance'
        })
    }


    const toAccount = await Account.findOne({userId : to}).session(session);


    if(!toAccount) {
        await session.abortTransaction()
        res.status(411).json({
            message : `${to} does not exist`
        })
        return;
    }

    await Account.updateOne({userId : req.userId} , {$inc : {balance : -amount}}).session(session);
    await Account.updateOne({userId : to} , {$inc : {balance : amount}}).session(session)

    await session.commitTransaction();

    res.status(200).json({
        message : `${amount} is tranferred from ${req.userId} to ${to}`
    })

})


export default accountRouter