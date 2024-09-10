//////////////////////////////////---Base 
import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
/////////////////////////////---Route Imports
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'

/////////////////////---
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('Mongo is Connected')
}).catch(err =>{
    console.log(err);
});

const app = express();
app.use(express.json());
app.use(cookieParser())

app.listen(3000,()=>{
    console.log("Server Connected");
})
//////////////////////////---Routes
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
////////////////////--MiddleWare
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message ||'Internal SeverError';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})