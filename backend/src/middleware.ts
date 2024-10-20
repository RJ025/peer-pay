import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken";

declare module "express" {
    interface Request {
        userId ?: string
    }
}

interface tokenInterface {
    userId : string
}

const authMiddleware = (req : Request , res:Response , next : NextFunction) : void => {
    const authHeader : string = req.headers.authorization || '';

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(403).json({
            message : 'unauthorized path'
        })

        return;
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded  = jwt.verify(token , process.env.SECRET || '') as tokenInterface
        if(decoded.userId){
            req.userId = decoded.userId;
            next()
        } else {
            res.status(403).json({
                message : 'unauthorized path'
            })

            return;
        }
        
    } catch (err) {
        res.status(403).json({
            message : err
        })

        return;
    }
}

export default authMiddleware;