import express  from "express";
const router = express.Router();
import userRouter from "./user";
import accountRouter from "./account";


router.use('/user' , userRouter)
router.use('/account' , accountRouter)



export default router


