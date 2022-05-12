import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import bodyParser from 'body-parser'
import blogRouter from './routes/blogRoutes.js'
import cors from 'cors'
const app=express();
//
app.use(bodyParser.urlencoded({extended:true,limit:"30mb"}))
app.use(bodyParser.json({extended:true,limit:"30mb"}))
app.use(cors())
//use routes
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)
const mongoose_conn='mongodb+srv://fisto:1234@fisi.ivom7.mongodb.net/fisto?retryWrites=true&w=majority'
mongoose.connect(mongoose_conn)
.then(()=>app.listen(5000))
.then(()=>console.log('connected to localhost 5000'))