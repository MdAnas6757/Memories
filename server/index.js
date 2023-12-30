import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import postRoutes from './routes/posts.js';
import path from 'path';
import userRoutes from './routes/users.js';
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config();
//database coonection
connectDB();
const app=express();

app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors({
    origin: 'http://localhost:3000'
})); 
app.use('/posts',postRoutes);
app.use('/user',userRoutes);
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
const port=process.env.PORT||5000
//lisen port
app.listen(port,()=>{
    console.log(`Server Running in ${process.env.MONGO_URI} Mode on port ${process.env.PORT}`.bgCyan.white)
})
