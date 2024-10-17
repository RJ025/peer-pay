import express from 'express';
import router from './routes';
import { dbConnect } from './db/db';
import dotenv from 'dotenv'
import cors from 'cors'
const app = express();
app.use(cors())
app.use(express.json())
dotenv.config()

dbConnect()
.then(()=>{
    console.log('db connected')
});


app.use('/api/v1' , router);

app.listen(process.env.PORT , ()=>{
    console.log("Server is running")
})